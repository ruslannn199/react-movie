import styled from 'styled-components';

interface WrapperProps {
  $small?: boolean;
}

export const Wrapper = styled.div<WrapperProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--darkGrey);
  width: 25%;
  min-width: ${({ $small }) => ($small ? '150px' : '200px')};
  height: ${({ $small }) => ($small ? '45px' : '60px')};
  border-radius: 30px;
  color: #fff;
  border: none;
  font-size: ${({ $small }) => ($small ? 'var(--fontSmall)' : 'var(--fontBig)')};
  margin: 20px auto;
  transition: all .3s;
  outline: none;
  cursor: pointer;
  user-select: none;

  &:hover {
    opacity: .8;
  }
`;
