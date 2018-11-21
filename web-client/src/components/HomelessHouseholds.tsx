import * as React from 'react';
import Age from './dataVisualisation/Age';
import Decision from './dataVisualisation/Decision';
import Need from './dataVisualisation/Need';
import Filters from './Filters';
import { Layout } from './Layout';

export const HomelessHouseholds: React.SFC<{}> = () => {
  return (
    <Layout
      sidebar={<Filters />}
      tiles={[
        <Decision key='tile-decision' />,
        <Age key='tile-age' />,
        <Need key='tile-need' />,
        <div key='tile-profile'/>,
        <div key='tile-reason'/>,
      ]}
    />
  )
}