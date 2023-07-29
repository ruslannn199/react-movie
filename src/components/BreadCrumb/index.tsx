import { Link } from 'react-router-dom';
// Styles
import { Wrapper, Content } from './BreadCrumb.styles';

const BreadCrumb: React.FC<Record<'movieTitle', string>> = ({ movieTitle }) => (
  <Wrapper>
    <Content>
      <Link to={'/'}>
        <span>Home</span>
      </Link>
      <span>|</span>
      <span>{movieTitle}</span>
    </Content>
  </Wrapper>
);

export default BreadCrumb;
