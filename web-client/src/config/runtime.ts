interface IRuntimeVariables {
  API_HOST: string,
}

let API_HOST;

const hostname = window && window.location && window.location.hostname;

if (hostname === 'homeless-households-web-client.herokuapp.com') {
  API_HOST = 'https://homeless-households-server.herokuapp.com/graphql'
} else if (hostname === 'localhost') {
  API_HOST = 'http://localhost:8080/graphql'
} else {
  throw new Error(`Unrecognised environment based on hostname ${hostname}`);
}

const RUNTIME_VARIABLES: IRuntimeVariables = {
  API_HOST
};

export {
  RUNTIME_VARIABLES
}
