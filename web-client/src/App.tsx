import * as React from 'react';
import './App.css';

import logo from './logo.svg';

class App extends React.Component {

  public componentDidMount() {
    this.getInitialData();
  }

  public async getInitialData() {

    const request = {
      query: 'query { getHomelessHouseholds(input:{limit:10, offset:0}) { id }}',
      variables: null,
    }

    await fetch(
      'http://localhost:8080/graphql',
      {
        body: JSON.stringify(request),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'post',
      })
      .then((response) => {
        // tslint:disable-next-line:no-console
        console.log(">>> response", response)
        const data = response.json();
        // tslint:disable-next-line:no-console
        console.log("response data", data);
      });
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
