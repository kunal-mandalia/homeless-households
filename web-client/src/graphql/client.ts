import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { withClientState } from 'apollo-link-state';
import { RUNTIME_VARIABLES } from '../config/runtime';
import { defaults, resolvers } from './resolvers';
import { typeDefs } from './typedefs';

const cache = new InMemoryCache();

const stateLink = withClientState({ resolvers, defaults, cache, typeDefs });

const httpLink = new HttpLink({
  uri: RUNTIME_VARIABLES.API_HOST,
});

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([stateLink, httpLink])
});

export default client;