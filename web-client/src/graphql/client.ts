import ApolloClient from 'apollo-boost';
import { RUNTIME_VARIABLES } from '../config/runtime'

const client = new ApolloClient({
  uri: RUNTIME_VARIABLES.API_HOST
});

export default client;