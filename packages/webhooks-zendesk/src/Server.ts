/* eslint-disable camelcase */
import Express, { Response } from 'express'
import debug, { Debugger } from 'debug'
import * as yup from 'yup'
import AdvogadaCreateUser from './integrations/AdvogadaCreateUser'
import PsicólogaCreateUser from './integrations/PsicólogaCreateUser'
import ListTicketsFromUser from './integrations/ListTicket'
import AdvogadaCreateTicket from './integrations/AdvogadaCreateTicket'
import AdvogadaUpdateTicket from './integrations/AdvogadaUpdateTicket'

interface DataType {
  data: {
    logTable: {
      returning: Array<{
        id: number
      }>
    }
  }
}

interface FormData {
  cep: string
}

export enum FILTER_SERVICE_STATUS {
  SUCCESS,
  NOT_DESIRED_SERVICE,
  INVALID_REQUEST
}

export enum FILTER_FORM_NAME_STATUS {
  SUCCESS,
  FORM_NOT_IMPLEMENTED,
  INVALID_REQUEST,
  INVALID_JSON,
}

class Server {
  private server = Express().use(Express.json())

  private dbg: Debugger

  private formData?: FormData

  constructor () {
    this.dbg = debug(`webhooks-zendesk`)
  }

  private filterService = (payload: any) => {
    try {
      const { event: { data: { new: { service_name: serviceName, data, created_at: createdAt } } } } = payload
      this.dbg(`received service "${serviceName}"`)
      if (serviceName !== 'mautic-form') {
        this.dbg(`${serviceName} not desired service`)
        return {
          status: FILTER_SERVICE_STATUS.NOT_DESIRED_SERVICE,
          serviceName
        }
      }
      return {
        status: FILTER_SERVICE_STATUS.SUCCESS,
        data,
        createdAt
      }
    } catch (e) {
      this.dbg(e)
      return {
        status: FILTER_SERVICE_STATUS.INVALID_REQUEST
      }
    }
  }

  private filterFormName = async (json: any) => {
    let data: any
    try {
      data = JSON.parse(json)
    } catch (e) {
      return {
        status: FILTER_FORM_NAME_STATUS.INVALID_JSON,
        json
      }
    }
    const validation = yup.object().shape({
      'mautic.form_on_submit': yup.array().of(yup.object().shape({
        submission: yup.object().shape({
          form: yup.object().shape({
            name: yup.string().required()
          }),
          results: yup.object().required()
        })
      }))
    })
    let validationResult
    try {
      validationResult = await validation.validate(data)
    } catch (e) {
      this.dbg(e)
      return {
        status: FILTER_FORM_NAME_STATUS.INVALID_REQUEST,
        data
      }
    }
    const { 'mautic.form_on_submit': [{ submission: { form: { name }, results } }] } = validationResult
    let InstanceClass
    switch (name) {
      case 'Recadastro: Advogadas Ativas':
        InstanceClass = AdvogadaCreateUser
        break
      case 'Recadastro: Psicólogas Ativas':
        InstanceClass = PsicólogaCreateUser
        break
      default:
        this.dbg(`InstanceClass "${name}" doesn't exist`)
        return {
          status: FILTER_FORM_NAME_STATUS.FORM_NOT_IMPLEMENTED,
          name
        }
    }
    return {
      status: FILTER_FORM_NAME_STATUS.SUCCESS,
      InstanceClass,
      results
    }
  }

  dictionary: {[s: string]: string} = {
    reprovada_estudo_de_caso: 'Reprovada - Estudo de Caso'
  }

  createTicket = async (instance: any, {
    id,
    organization_id,
    name,
    user_fields: {
      registration_number,
      condition
    }
  }: any, res: Response) => {
    const listTickets = new ListTicketsFromUser(id, res)
    const tickets = await listTickets.start()
    if (!tickets) {
      return
    }
    if (tickets.data.tickets.length === 0) {
      if (instance instanceof AdvogadaCreateUser) {
        const advogadaCreateTicket = new AdvogadaCreateTicket(res)
        advogadaCreateTicket.start({
          requester_id: id,
          organization_id,
          description: '-',
          subject: `[Advogada] ${name} - ${registration_number}`,
          custom_fields: [{
            id: 360021665652,
            value: this.dictionary[condition]
          }, {
            id: 360016631592,
            value: name
          }]
        })
      } else if (instance instanceof PsicólogaCreateUser) {
        // etc
      }
    } else {
      if (instance instanceof AdvogadaCreateUser) {
        const advogadaUpdateTicket = new AdvogadaUpdateTicket(tickets.data.tickets[0].id, res)
        advogadaUpdateTicket.start({
          requester_id: id,
          organization_id,
          description: '-',
          subject: `[Psicóloga] ${name} - ${registration_number}`,
          custom_fields: [{
            id: 360021665652,
            value: this.dictionary[condition]
          }, {
            id: 360016631592,
            value: name
          }]
        })
      }
    }
  }

  start = () => {
    const { PORT } = process.env
    this.server
      .post('/', async (req, res) => {
        const { status: serviceStatus, serviceName, createdAt, data } = await this.filterService(req.body)

        if (serviceStatus === FILTER_SERVICE_STATUS.NOT_DESIRED_SERVICE) {
          return res.status(200).json(`Service "${serviceName}" isn't desired, but everything is OK.`)
        } else if (serviceStatus === FILTER_SERVICE_STATUS.INVALID_REQUEST) {
          this.dbg(`Erro desconhecido ao filtrar por serviço.`)
          return res.status(400).json(`Erro desconhecido ao filtrar por serviço.`)
        }

        const { InstanceClass, results, status: formNameStatus, name, json, data: errorData } = await this.filterFormName(data)
        if (formNameStatus === FILTER_FORM_NAME_STATUS.FORM_NOT_IMPLEMENTED) {
          this.dbg(`Form "${name}" not implemented. But it's ok`)
          return res.status(200).json(`Form "${name}" not implemented. But it's ok`)
        } else if (formNameStatus === FILTER_FORM_NAME_STATUS.INVALID_JSON) {
          this.dbg(`Invalid JSON saved on database.`)
          this.dbg(json)
          return res.status(400).json(`Invalid JSON saved on database, see logs.`)
        } else if (formNameStatus === FILTER_FORM_NAME_STATUS.INVALID_REQUEST) {
          this.dbg(`Invalid request.`)
          this.dbg(errorData)
          return res.status(400).json(`Invalid request, see logs.`)
        }

        const instance = await new InstanceClass!(res)
        let user
        if (instance instanceof AdvogadaCreateUser) {
          user = await instance.start(results, createdAt)
        } else if (instance instanceof PsicólogaCreateUser) {
          instance.start()
        }

        if (!user) {
          return
        }

        const { data: { user: createdUser, user: { created_at: responseCreatedAt, updated_at: responseUpdatedAt, id: userId } } } = user
        this.dbg(createdUser)
        if (responseCreatedAt === responseUpdatedAt) {
          this.dbg(`Success, created user ${userId}!`)
        } else {
          this.dbg(`Success, updated user ${userId}!`)
        }

        this.createTicket(instance, createdUser, res)
      })
      .listen(Number(PORT), '0.0.0.0', () => {
        this.dbg(`Server listen on port ${PORT}`)
      })
  }
}

export default Server
