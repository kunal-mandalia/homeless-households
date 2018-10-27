import * as React from 'react';
import { Filters } from './Filters';
import { Layout } from './Layout';

interface ILayoutProps {
  count: number,
  data: IHomelessHouseholds[],
  filters: IFilters,
  filteredData: IHomelessHouseholds[],
  total: number,
  handleFilterChange(filter: string, value: any): void,
}

export const HomelessHouseholds: React.SFC<ILayoutProps> = ({
  count,
  data,
  filteredData,
  filters,
  handleFilterChange,
  total,
}) => {
  const filterComponent = (
    <Filters
      count={count}
      data={data}
      filters={filters}
      onFilterChange={handleFilterChange}
      total={total}
    />
  );

  return (
    <Layout
      sidebar={filterComponent}
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