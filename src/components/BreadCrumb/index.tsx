import React from 'react';
import { Link } from 'react-router-dom';
// Styles
import { Wrapper, Content } from './BreadCrumb.styles';

interface BreadCrumbProps {
  movieTitle: string;
}

const BreadCrumb: React.FC<BreadCrumbProps> = ({ movieTitle }) => (
  <Wrapper>
    <Content>
      <Link to={'/'}>
        <span>На главную</span>
      </Link>
      <span>|</span>
      <span>{movieTitle}</span>
    </Content>
  </Wrapper>
);

export default BreadCrumb;
