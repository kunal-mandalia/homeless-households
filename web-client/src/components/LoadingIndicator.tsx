import { Icon, Spin } from 'antd';
import * as React from 'react';
import styled from 'styled-components';
import { COLORS } from '../constants';

const antIcon = <Icon type="loading" style={{ fontSize: '5em' }} spin={true} />;

const SpinWrapper = styled.div`
  background-color: ${COLORS.MAROON};
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
`

export const LoadingIndicator = () => (
  <SpinWrapper>
    <Spin indicator={antIcon} />
  </SpinWrapper>
);
