import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// Components
import Button from './Button';
// Styles
import { Wrapper } from './Login.styles';
// Context
import { Context } from '../context';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase.utils';

interface LoginFormFields {
  name: string;
  value: string;
}

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const { setUser } = useContext(Context);

  const navigate = useNavigate();

  const handleInput = (e: React.SyntheticEvent<LoginFormFields>) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    if (name === 'username') setUsername(value);
    if (name === 'password') setPassword(value);
  };

  const handleSubmit = async () => {
    setError(false);
    try {
      const { user } = await signInWithEmailAndPassword(auth, username, password);
      if (setUser) {
        setUser(user);
      }
      navigate('/');
    } catch (err) {
      setError(true);
    }
  };

  return (
    <Wrapper>
      {error && <div className='error'>Возникла ошибка!</div>}
      <label>Для входа используйте свой TMDB аккаунт</label>
      <input
        type='text'
        value={username}
        name='username'
        onChange={handleInput}
      />
      <input
        type='password'
        value={password}
        name='password'
        onChange={handleInput}
      />
      <Button text='Войти' $small callback={handleSubmit} />
    </Wrapper>
  )
}

export default Login;
