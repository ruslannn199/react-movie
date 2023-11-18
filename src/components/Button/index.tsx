import React from 'react';
// Styles
import { Wrapper } from './Button.styles';
// Types
import type { ButtonProps } from '../../types/types';

const Button: React.FC<ButtonProps> = ({ text, callback, $small }) => (
  <Wrapper itemType='button' onClick={callback} $small={$small}>
    {text}
  </Wrapper>
);

export default Button;
