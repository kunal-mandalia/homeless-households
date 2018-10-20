import gql from 'graphql-tag';
import { Query } from "react-apollo";

export const GET_HOMELESS_HOUSEHOLDS = gql`
{
  getHomelessHouseholds(input: { limit: 2, offset: 0 }) {
    id
    need
    decision
  }
}
`

export class QueryGetHomelessHouseholds extends Query<IQueryHomelessHouseholds, {}> {}
