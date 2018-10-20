import * as React from 'react';
import { ApolloProvider } from "react-apollo";
import * as ReactDOM from 'react-dom';
import App from './App';
import client from './graphql/client';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <ApolloProvider client={client}><App /></ApolloProvider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
