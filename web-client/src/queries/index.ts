import gql from 'graphql-tag';

export const GET_HOMELESS_HOUSEHOLDS = gql`
  query HomelessHouseholds($input: HomelessHouseholdsInput!) {
    homelessHouseholds(input: $input) {
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

export const GET_FILTERS = gql`
  query {
    filters @client {
      ageRange
      decision
      need
      reason
      ethnicity
      nationality
    }
  }
`;

export const UPDATE_FILTER = gql`
  mutation UpdateFilter($input: UpdateFilterInput) {
    updateFilter(input: $input) @client
  }
`;
