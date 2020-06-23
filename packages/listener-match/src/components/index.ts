import dbg from "../dbg";
import { SubscriptionResponse, Volunteer } from "../types";
import {
  getRequestedVolunteerType,
  getVolunteerOrganizationId
} from "../services/utils";
import {
  fetchVolunteersAvailable,
  getClosestVolunteer,
  createVolunteerTicket
} from "./Volunteers";
import {
  fetchIndividual,
  forwardPublicService,
  updateIndividualTicket
} from "./Individual";
import {
  createMatchTicket,
  updateSolidarityTickets
} from "../graphql/mutations";

const log = dbg.extend("match");
const syncLog = dbg.extend("syncTickets");

let AGENT = 1;
let cache = new Array();

const syncTickets = async (ids: number[]) => {
  syncLog(`Updating sync status from MSR tickets ${ids}`);

  const ticket = { match_syncronized: true };
  const sync = await updateSolidarityTickets(ticket, ids);
  if (!sync) {
    syncLog("Couldn't update sync status from MSR tickets:", ids);
    return undefined;
  }

  if (AGENT < 3) {
    AGENT++;
  } else {
    AGENT = 1;
  }

  log("Tickets that passed through match:", ids);
  log("Match is done");
  return true;
};

export const handleMatch = () => async (response: SubscriptionResponse) => {
  log(`${new Date()}: \nReceiving data on subscription GraphQL API...`);
  // log({ response: JSON.stringify(response, null, 2) });

  const {
    data: { solidarity_tickets: tickets }
  } = response;

  cache = tickets
    .map(ticket => {
      if (!cache.includes(ticket.ticket_id)) return ticket;
      return undefined;
    })
    .filter(Boolean);

  if (cache.length > 0) {
    const volunteers_available = await fetchVolunteersAvailable();

    const matchs = cache.map(async individualTicket => {
      const {
        subject,
        status_acolhimento,
        atrelado_ao_ticket,
        requester_id,
        ticket_id
      } = individualTicket;

      if (
        status_acolhimento === "solicitaçao_repetida" &&
        atrelado_ao_ticket === null
      )
        return undefined;

      log(`Searching closest volunteer to MSR '${requester_id}'`);

      const volunteer_type = getRequestedVolunteerType(subject);
      if (!volunteer_type) return ticket_id;
      const volunteer_organization_id = getVolunteerOrganizationId(
        volunteer_type
      );
      const filteredVolunteers = volunteers_available.filter(
        ({ organization_id }) => organization_id === volunteer_organization_id
      );

      const individual = await fetchIndividual(requester_id);
      if (individual.length < 1) return ticket_id;

      const volunteer = getClosestVolunteer(individual[0], filteredVolunteers);
      if (!volunteer) {
        log("Couldn't find any close volunteers for MSR");
        return await forwardPublicService(
          ticket_id,
          individual[0].state,
          AGENT
        );
      }

      const volunteer_ticket_id = await createVolunteerTicket(
        volunteer,
        individualTicket,
        AGENT
      );
      if (!volunteer_ticket_id) return undefined;
      volunteer["ticket_id"] = volunteer_ticket_id;

      const newTicketId = ticket_id;
      if (status_acolhimento === "solicitação_repetida" && atrelado_ao_ticket) {
        individualTicket["ticket_id"] = atrelado_ao_ticket;
      }

      const updateIndividual = await updateIndividualTicket(
        individualTicket,
        volunteer as Volunteer & { ticket_id: number },
        AGENT
      );
      if (!updateIndividual) return undefined;

      const matchTicket = await createMatchTicket(
        individualTicket,
        volunteer as Volunteer & { ticket_id: number }
      );
      if (!matchTicket) return undefined;
      return individualTicket["ticket_id"] !== newTicketId
        ? [newTicketId, updateIndividual]
        : updateIndividual;
    });

    const sync_tickets = (await Promise.all(matchs)).flat(2).filter(Boolean);
    if (sync_tickets.length < 1) {
      log("No tickets to sync");
      return undefined;
    }

    return await syncTickets(sync_tickets as number[]);
  } else {
    log("No tickets to sync");
    return undefined;
  }
};

export default handleMatch;
