import * as graphql from 'graphql';

const { buildSchema } = graphql;
const schema = buildSchema(`
  scalar Date

  type HomelessHouseholds {
    id: Int
    age: Int
    createdAt: Date
    decision: String
    decisionCode: Int
    decisionDate: Date
    ethnicity: String
    nationality: String
    need: String
    publisherLabel: String
    publisherUri: String
    reason: String
    registrationDate: Date
    updatedAt: Date
  }

  type Query {
    getHomelessHouseholds: [HomelessHouseholds!]
  }
`);

export {
  schema
}
