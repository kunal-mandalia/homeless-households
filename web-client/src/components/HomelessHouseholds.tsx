import * as React from 'react';
import Decision from './dataVisualisation/Decision';
import Filters from './Filters';
import { Layout } from './Layout';

export const HomelessHouseholds: React.SFC<{}> = () => {
  return (
    <Layout
      sidebar={<Filters />}
      tiles={[
        <Decision key='tile-decision' />,
        <div key='tile-need'/>,
        <div key='tile-age'/>,
        <div key='tile-profile'/>,
        <div key='tile-reason'/>,
      ]}
    />
  )
}