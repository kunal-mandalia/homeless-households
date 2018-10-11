# Architecture
A layered N-Tier application has been chosen to support the client-server model.

## Server
Node.js to handle I/O such as frequent database reads. Written in TypeScript.

## Persistence
Postgres to support querying of data.

## Web Client
Nginx serving a React.js application. Written in TypeScript.

## Communication Protocols
Client and server will communicate over http TCP/IP. GraphQL will provide a common schema for the client and server.

## Security
All data is in the public domain and is non-sensitive. There is no requirement for authentication or authorization.

## Scalability
512MB of RAM should be sufficient to run the server for low volume workloads. Should the need arise, the node.js app may be scaled both vertically (initially) and then horizontally.

## Deployment
CircleCI will run a build and test prior to merging into master. Heroku will host both the client and server within the limits of the free plan. Two cloud environments; Development and Production, will be provisioned to allow development not to interfer with the end-user's experience.
