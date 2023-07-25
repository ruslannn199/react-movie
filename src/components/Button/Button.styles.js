import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--darkGrey);
  width: 25%;
  min-width: 200px;
  height: 60px;
  border-radius: 30px;
  color: #fff;
  border: none;
  font-size: var(--fontBig);
  margin: 20px auto;
  transition: all .3s;
  outline: none;
  cursor: pointer;
  user-select: none;

  &:hover {
    opacity: .8;
  }
`;
