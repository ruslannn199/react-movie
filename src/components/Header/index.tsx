import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

import RMDBLogo from '../../images/react-movie-logo.svg';

import { Wrapper, Content, LogoImg } from './Header.styles';
// Context
import { Context } from '../../context';

const Header: React.FC = () => {
  const { user } = useContext(Context);
  return (
    <Wrapper>
      <Content>
        <Link to='/'>
          <LogoImg src={RMDBLogo} alt='rmdb-logo' />
        </Link>
        {user ? (
            <span>Вы вошли как: {user.email}</span>
          ) : (
            <Link to='/login'>
              <span className='login'>Войти</span>
            </Link>
          )
        }
      </Content>
    </Wrapper>
  );
};

export default Header;
