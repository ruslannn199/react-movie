import React from 'react';
// Styles
import { Wrapper, Image } from './Actor.styles';
// Types
import type { ActorProps } from '../../types/types';

const Actor: React.FC<ActorProps> = ({ name, character, imageUrl }) => (
  <Wrapper>
    <Image src={imageUrl} alt='actor-thumb' />
    <h3>{name}</h3>
    <p>{character}</p>
  </Wrapper>
);

export default Actor;
