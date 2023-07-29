// Styles
import { Wrapper } from './Button.styles';
// Types
import type { ButtonProps } from '../../types/types';


const Button: React.FC<ButtonProps> = ({ text, callback }) => (
  <Wrapper itemType='button' onClick={callback}>
    {text}
  </Wrapper>
);

export default Button;
