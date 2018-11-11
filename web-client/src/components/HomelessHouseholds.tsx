import * as React from 'react';
import Filters from './Filters';
import { Layout } from './Layout';


export const HomelessHouseholds: React.SFC<{}> = () => {
  return (
    <Layout
      sidebar={<Filters />}
      tiles={[
        <div key='tile-age'/>,
        <div key='tile-need'/>,
        <div key='tile-reason'/>,
        <div key='tile-profile'/>,
        <div key='tile-details'/>
      ]}
    />
  )
}