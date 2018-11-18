export const typeDefs = `
  scalar Date

  type HomelessHouseholds {
    id: Int!
    age: Int!
    decision: String!
    decisionCode: Int!
    decisionDate: Date
    ethnicity: String!
    nationality: String!
    reason: String!
    need: String!
  }

  type Filters {
    ageRange: [Int]
    decision: String
    ethnicity: String
    nationality: String
    need: String
    reason: String
    touched: Boolean
  }

  input HomelessHouseholdsInput {
    limit: Int
    offset: Int
  }

  input UpdateFilterInput {
    filterName: String!
    filterValue: String
  }

  type Query {
    filters: Filters!
    filteredHomelessHouseholds: [HomelessHouseholds]!
    homelessHouseholds(input: HomelessHouseholdsInput!): [HomelessHouseholds]!
  }

  type Mutation {
    updateFilter(input: UpdateFilterInput): Filters
  }
`