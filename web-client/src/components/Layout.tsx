import * as React from 'react';
import styled from 'styled-components';
import { Filters } from './Filters';

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  min-height: 100vh;
`

const Sidebar = styled.div`
  background-color: #d9d9d9;
  flex-basis: 320px;
  flex-grow: 1;
`
  
const Tiles = styled.div`
  background-color: #e3e3e3;
  flex-basis: 400px;
  flex-grow: 3;
`

interface ILayoutProps {
  count: number,
  data: IHomelessHouseholds[],
  filters: IFilters,
  filteredData: IHomelessHouseholds[],
  total: number,
  handleFilterChange(filter: string, value: any): void,
}

export const Layout: React.SFC<ILayoutProps> = ({
  count,
  data,
  filteredData,
  filters,
  handleFilterChange,
  total,
}) => (
  <LayoutWrapper>
    <Tiles />
    <Sidebar>
      <Filters
        count={count}
        data={data}
        filters={filters}
        onFilterChange={handleFilterChange}
        total={total}
      />
    </Sidebar>
  </LayoutWrapper>
)