import * as React from 'react';
import styled from 'styled-components';
import { COLORS } from '../constants';

interface IProps {
  sidebar: JSX.Element,
  tiles: JSX.Element[],
}

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap-reverse;
  min-height: 100vh;
  background-color: ${COLORS.MAROON_LIGHT};
`

const SidebarWrapper = styled.div`
  background-color: ${COLORS.MAROON};
  flex-basis: 400px;
  flex-grow: 0;
`

const TilesWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-grow: 8;
  flex-wrap: wrap;
  border: solid 4px ${COLORS.MAROON};
`

const Tile = styled.div`
  flex: 1 1 400px;
  border: solid 4px ${COLORS.MAROON};
`


export const Layout = ({ sidebar, tiles } : IProps) => {
  return <LayoutWrapper>
    <SidebarWrapper>{sidebar}</SidebarWrapper>
    <TilesWrapper>
      {tiles.map((tile, id) => <Tile key={id} data-count={tiles.length}>{tile}</Tile>)}
    </TilesWrapper>
  </LayoutWrapper>
}
