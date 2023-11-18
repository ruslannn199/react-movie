import React from 'react';
// Styles
import { Image } from './Thumb.styles';
// Types
import type { ThumbProps } from '../../types/types';
import { Link } from 'react-router-dom';

const Thumb: React.FC<ThumbProps> = ({ image, movieId, clickable }) => (
  <>
    {clickable ? (
      <Link to={`/${movieId}`}>
        <Image src={image} alt='movie-thumb' $collapsed />
      </Link>
    ) : (
      <Image src={image} alt='movie-thumb' />
    )}
  </>
);

export default Thumb;
