import React from 'react';
// Styles
import { Wrapper, Content } from './Grid.styles';
// Types
import type { GridProps } from '../../types/types';

const Grid: React.FC<React.PropsWithChildren<GridProps>> = ({ header, children }) => (
  <Wrapper>
    <h1>{header}</h1>
    <Content>{children}</Content>
  </Wrapper>
);

export default Grid;
