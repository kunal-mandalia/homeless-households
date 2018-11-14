import * as React from 'react';
import styled from 'styled-components';

const TileWrapper = styled.div`
  padding: 15px;
  height: 87%;
`

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

export const Tile = (WrappedComponent: React.ComponentType<any>) => (name: string) => (props: any) => {
  return <TileWrapper key={name}>
      <h3>{name}</h3>
      <Center>
        <WrappedComponent {...props} />
      </Center>
    </TileWrapper>
}
