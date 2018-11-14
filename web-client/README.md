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
-------- Decision (S)
-------- Need (S)
-------- Age (S)
-------- Ethnicity (S)

Key:
* (C): Class with state, methods
* (S): Stateless Functional Component
```

## UI Theme AntDesign

Antdesign has been themed via `config-overrides.js`.

## Apollo client patterns

Declarative components: 

```javascript
import { Mutation } from 'react-apollo'

<Mutation mutation={MUTATION} variables={VARIABLES}>
  {({ mutate, result }) => {
    <MyComponent ... />
  })}
</Mutation>
```

Higher order components:

```javascript
import { graphql } from 'react-apollo'

const MyComponent = ({ data }) => { ... }

export default graphql(QUERY)(MyComponent)
```

## Data Visualisation

Recharts will be used as the data visualisation library for the following 'tiled' components:
* Profile: Custom (Canvas / SVG)
* Decision: RadarChart
* Need: CustomActiveShapePieChart
* Age: SimpleBarChart
* Ethnicity: PieChartWithCustomizedLabel