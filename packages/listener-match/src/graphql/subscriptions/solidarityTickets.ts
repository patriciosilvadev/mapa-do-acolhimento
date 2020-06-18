import gql from "graphql-tag";
import { client as GraphQLAPI } from "..";
import handleMatch from "../../components";
import dbg from "../../dbg";

const log = dbg.extend("subscriptionFormEntries");

const SOLIDARITY_USERS_SUBSCRIPTION = gql`
  subscription pipeline_solidarity_tickets($organization_id: bigint) {
    solidarity_tickets(
      where: {
        organization_id: { _eq: $organization_id }
        _or: [
          { status_acolhimento: { _eq: "solicitação_repetida" } }
          { status_acolhimento: { _eq: "solicitação_recebida" } }
        ]
        subject: { _similar: "%(Psicológico|Jurídico)%" }
        nome_msr: { _is_null: false }
        status: { _nin: ["closed", "deleted", "solved"] }
        match_syncronized: { _eq: false }
      }
      order_by: { data_inscricao_bonde: asc }
    ) {
      subject
      ticket_id
      atrelado_ao_ticket
      requester_id
      nome_msr
      status_acolhimento
    }
  }
`;

const error = (err: any) => {
  log("Receiving error on subscription GraphQL API: ", err);
};

export default async (): Promise<any> => {
  try {
    const observable = GraphQLAPI.subscribe({
      query: SOLIDARITY_USERS_SUBSCRIPTION,
      variables: {
        organization_id: 360273031591,
      },
      fetchPolicy: "network-only",
    }).subscribe({ next: handleMatch(), error });

    return observable;
  } catch (err) {
    log("failed on subscription: ".red, err);
    return undefined;
  }
};
