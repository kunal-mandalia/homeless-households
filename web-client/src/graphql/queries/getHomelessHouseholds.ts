import gql from 'graphql-tag';
import { Query } from "react-apollo";

export const GET_HOMELESS_HOUSEHOLDS = gql`
{
  homelessHouseholds(input: { limit: 100, offset: 0 }) {
    id
    age
    decision
    decisionCode
    decisionDate
    ethnicity
    nationality
    reason
    need
  }
}
`

export class QueryGetHomelessHouseholds extends Query<IQueryHomelessHouseholds, {}> {}
