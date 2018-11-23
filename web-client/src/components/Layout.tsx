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
  background-color: ${COLORS.MAROON};
`

const SidebarWrapper = styled.div`
  background-color: ${COLORS.MAROON};
  flex-basis: 400px;
  flex-grow: 0;
`

const TilesWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex: 1;
  flex-grow: 8;
  flex-wrap: wrap;
  width: 100%;
  margin: 5px;
`

const Tile = styled.div`
  background-color: ${COLORS.MAROON_LIGHT};
  box-sizing: border-box;
  margin: 5px;
  flex-basis: 400px;
  flex-grow: 1;
  flex-shrink: 1;
  width: 50%;
  min-height: 470px;
`


export const Layout = ({ sidebar, tiles } : IProps) => {
  return <LayoutWrapper>
    <SidebarWrapper>{sidebar}</SidebarWrapper>
    <TilesWrapper>
      {tiles.map((tile, id) => <Tile key={id} data-count={tiles.length}>{tile}</Tile>)}
    </TilesWrapper>
  </LayoutWrapper>
}
