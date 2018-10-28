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
    ageRange: [Int!]
    decision: String
    ethnicity: String
    nationality: String
    need: String
    reason: String
  }

  input HomelessHouseholdsInput {
    limit: Int
    offset: Int
  }

  type Query {
    homelessHouseholds(input: HomelessHouseholdsInput!): [HomelessHouseholds]!
    filters: Filters!
  }
`