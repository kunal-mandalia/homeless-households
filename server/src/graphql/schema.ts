import * as graphql from 'graphql';

const { buildSchema } = graphql;
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

export {
  schema
}
