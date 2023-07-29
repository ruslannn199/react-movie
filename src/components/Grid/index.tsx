// Styles
import { Wrapper, Content } from './Grid.styles';
// Types
import type { GridProps } from '../../types/types';

const Grid: React.FC<GridProps> = ({ header, children }) => (
  <Wrapper>
    <h1>{header}</h1>
    <Content>{children}</Content>
  </Wrapper>
);

export default Grid;
