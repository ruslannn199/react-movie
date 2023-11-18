import styled from 'styled-components';

interface ImageProps {
  $collapsed?: boolean;
}

export const Image = styled.img<ImageProps>`
  width: 100%;
  max-width: 720px;
  ${({ $collapsed }) => {
    if ($collapsed) return 'height: 100%; max-height: 100%';
  }}
  transition: all .3s;
  object-fit: cover;
  border-radius: 20px;
  animation: animateThumb .5s;

  @media screen and (min-width: 768px) and (max-width: 992px) {
    ${({ $collapsed }) => {
      if (!$collapsed) return 'max-width: 480px';
    }}
  }

  &:hover {
    opacity: .8;
  }

  @keyframes animateThumb {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
