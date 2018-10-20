import * as React from 'react';
import { MockedProvider } from 'react-apollo/test-utils';
import * as ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MockedProvider mocks={[]}><App /></MockedProvider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
