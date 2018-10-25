import * as React from 'react';
import styled from 'styled-components';
import { COLORS } from '../constants';
import { Filters } from './Filters';

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap-reverse;
  min-height: 100vh;
`

const Sidebar = styled.div`
  background-color: ${COLORS.MAROON};
  flex-basis: 385px;
  flex-grow: 0;
`
  
const Tiles = styled.div`
  display: flex;
  flex: 1;
  flex-grow: 8;
  flex-wrap: wrap;
  border: solid 4px ${COLORS.MAROON};
`

const Tile = styled.div`
  flex: 1;
  flex-basis: 300px;
  border: solid 4px ${COLORS.MAROON};
  height: 50%;
  min-height: 200px;
  background-color: ${COLORS.MAROON_LIGHT};
`

interface ILayoutProps {
  count: number,
  data: IHomelessHouseholds[],
  filters: IFilters,
  filteredData: IHomelessHouseholds[],
  total: number,
  handleFilterChange(filter: string, value: any): void,
}

const tiles = Array(5).fill(0).map((_, id) => id);

export const Layout: React.SFC<ILayoutProps> = ({
  count,
  data,
  filteredData,
  filters,
  handleFilterChange,
  total,
}) => (
  <LayoutWrapper>
    <Tiles>
      {tiles.map(t => <Tile key={t} />)}
    </Tiles>
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