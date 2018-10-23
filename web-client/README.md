# Homeless households web client
Insight into homelessless in London using Open Data.

## Frontend architecture & tooling

* Framework: React. Statically typed with TypeScript
* One way communication initiated by client. API contract supported by GraphQL
* An Nginx server will serve requests to the production bundle
* UI library AntDesign

## Component design & data flow

```
- App
-- HomelessHouseholds (C)
---- Loading (S)
---- Error (S)
---- Layout (S)
------ Sidebar (S)
-------- Filters (C)
---------- Filters (S)
------ Tiles (S)
-------- Profile (S)
-------- Outcome (S)
-------- Need (S)
-------- Age (S)
-------- Ethnicity (S)

Key:
* (C): Class with state, methods
* (S): Stateless Functional Component
```
