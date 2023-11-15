import React from 'react';
import { useContext } from 'react';
import API from '../../API';
// Components
import Thumb from '../Thumb';
import Rate from '../Rate';
// Image
import NoImage from '../../images/no_image.jpg';
// Styles
import { Wrapper, Content, Text } from './MovieInfo.styles';
// Types
import type { Movie } from '../../types/types';
// Context
import { Context } from '../../context';

interface MovieInfoProps {
  movie: Movie;
}

const MovieInfo: React.FC<MovieInfoProps> = ({ movie }) => {

  const { user } = useContext(Context);
  // const directors = movie.staff.filter((staff) => (staff.professionKey === StaffProfession.DIRECTOR));

  return (
    <Wrapper backdrop={movie.poster.url || NoImage}>
      <Content>
        <Thumb
          image={movie.poster.previewUrl ? movie.poster.previewUrl : NoImage}
          clickable={false}
        />
        <Text>
          <h1>{movie.name || movie.alternativeName || movie.enName}</h1>
          <h3>PLOT</h3>
          <p>{movie.description}</p>

          <div className='rating-directors'>
            <div>
              <h3>RATING</h3>
              <div className='score'>{movie.rating.kp || movie.rating.imdb || movie.rating.tmdb}</div>
            </div>
            {/* <div className='director'>
              <h3>DIRECTOR{directors.length > 1 ? 'S' : ''}</h3>
              {directors.map((director) => (
                <p key={director.staffId}>{director.nameRu || director.nameEn || 'No name'}</p>
              ))}
            </div> */}
          </div>
        </Text>
      </Content>
    </Wrapper>
  );
};

export default MovieInfo;
