# homeless-households [![CircleCI](https://circleci.com/gh/kunal-mandalia/homeless-households.svg?style=svg)](https://circleci.com/gh/kunal-mandalia/homeless-households)
Insights into the causes of homelessness in London

## Motivation
[Open data sets](http://data.hounslow.gov.uk/api/housing-services/homeless-households/homeless-households?format=JSON) reveal the reasons why people who were at risk of or who were homeless applied for Government assistance. What does the data tell us about them?

By surfacing the data in a compelling manner, learn about how dimensions such as age, need, and ethnicity affect the level of support provided by the Local Authority.

## Demo
Web-client: https://homeless-households-web-client.herokuapp.com/

## Getting started
The monorepo consists of a server and web client.

### Install & start
* `git clone https://github.com/kunal-mandalia/homeless-households.git`
* `cd homeless-households && yarn install`
* Start server: `yarn build-server && yarn start-server`
* Start web-client: `yarn build-web-client && yarn start-web-client`

### Test
* Test server: `yarn test-server`
* Test web-client: `yarn test-web-client`

### Deploy
* Deploy server: `yarn deploy-server`
* Deploy web-client: `yarn deploy-web-client`

Heroku is the hosting provider for both the server and web-client. Since Heroku doesn't support multiple app deployments per one repo out-of-the-box, remote heroku branches were configured as [described here](http://adampaxton.com/how-to-deploy-to-multiple-heroku-apps-from-the-same-git-repository/)

## Implementation

### Architecture
Having worked with some great architects and inspired by an excellent [lecture](https://www.youtube.com/watch?v=x30DcBfCJRI&t=6277s) on architecture, a lightweight architecture has been defined inside [docs](./docs/architecture.md).

