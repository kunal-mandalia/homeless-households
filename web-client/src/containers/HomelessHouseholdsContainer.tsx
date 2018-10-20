import * as React from 'react';
import { GET_HOMELESS_HOUSEHOLDS, QueryGetHomelessHouseholds } from '../graphql/queries/getHomelessHouseholds';
import { LayourContainer } from './LayoutContainer';

export class HomelessHouseholdsContainer extends React.Component<{}> {
  public state = {
    hello: "world"
  }

  public render() {
    return (
      <QueryGetHomelessHouseholds query={GET_HOMELESS_HOUSEHOLDS}>
      {({ loading, error, data }) => {
        if (loading) { return <p>Loading...</p> };
        if (error) { return <p>Error :(</p> };
        if (!data) { return null };
        return (
          <LayourContainer
            data={data}
          />
        )
      }}
      </QueryGetHomelessHouseholds>
    )
  }
}
