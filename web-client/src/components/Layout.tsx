import * as React from 'react';
import styled from 'styled-components';

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  min-height: 100vh;
`

const Sidebar = styled.div`
  background-color: #d9d9d9;
  flex-basis: 200px;
  flex-grow: 1;
`
  
const Tiles = styled.div`
  background-color: #e3e3e3;
  flex-basis: 400px;
  flex-grow: 3;
`

interface ILayoutProps {
  data: IQueryHomelessHouseholds
}

export const Layout: React.SFC<ILayoutProps> = ({ data: getHomelessHouseholds }) => <LayoutWrapper>
  <Tiles />
  <Sidebar />
</LayoutWrapper>
