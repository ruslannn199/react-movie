import React from 'react';
// Components
import Thumb from '../Thumb';
// Image
import NoImage from '../../images/no_image.jpg';
// Styles
import { Wrapper, Content, Text } from './MovieInfo.styles';
// Types
import type { Movie, Person } from '../../types/types';

interface MovieInfoProps {
  movie: Movie;
  directors: Person[];
}

const MovieInfo: React.FC<MovieInfoProps> = ({ movie, directors }) => {
  return (
    <Wrapper $backdrop={movie?.poster?.url || NoImage}>
      <Content>
        <Thumb
          image={movie?.poster?.previewUrl ? movie.poster.previewUrl : NoImage}
        />
        <Text>
          <h1>{movie.name || movie.alternativeName || movie.enName}</h1>
          <h3>СЮЖЕТ</h3>
          <p>{movie.description}</p>

          <div className='rating-directors'>
            <div>
              <h3>РЕЙТИНГ</h3>
              <div className='score'>{movie.rating.kp || movie.rating.imdb || movie.rating.tmdb}</div>
            </div>
            <div className='director'>
              <h3>РЕЖИССЁР{directors.length > 1 ? 'Ы' : ''}</h3>
              {directors.map((director) => (
                <p key={director.id}>{director.name || director.enName || 'Имя отсутствует'}</p>
              ))}
            </div>
          </div>
        </Text>
      </Content>
    </Wrapper>
  );
};

export default MovieInfo;
