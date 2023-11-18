import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// Components
import BreadCrumb from './BreadCrumb';
import Grid from './Grid';
import Spinner from './Spinner';
import MovieInfo from './MovieInfo';
import MovieInfoBar from './MovieInfoBar';
import Actor from './Actor';
// Hook
import { useMovieFetch } from '../hooks/useMovieFetch';
// Image
import NoImage from '../images/no_image.jpg';
import type { Money } from '../types/types';

const Movie: React.FC = () => {
  const { movieId } = useParams();
  const [fee, setFee] = useState<Money>({ value: 0, currency: '$' });
  const { state: { movie, directors }, loading, error } = useMovieFetch(parseInt(movieId || '0', 10));

  useEffect(() => {
    if (movie && movie.fees) {
      const { world, russia, usa } = movie.fees;
      if (world && world.value && world.currency) {
        setFee({...world});
      } else if (russia && russia.value && russia.currency) {
        setFee({...russia});
      } else if (usa && usa.value && usa.currency) {
        setFee({...usa});
      }
    }
  }, [movie]);

  if (loading) return <Spinner />;
  if (error) return <div>Что-то пошло не так...</div>
  
  return (
    movie
      ? (
        <>
          <BreadCrumb movieTitle={movie.name || movie.alternativeName || movie.enName} />
          <MovieInfo movie={movie} directors={directors} />
          <MovieInfoBar
            time={movie.movieLength}
            budget={movie.budget}
            revenue={fee}
          />
          <Grid header='Actors'>
            {movie.persons.map((actor) => (
              <Actor
                key={`${actor.id}-${actor.enProfession}`}
                name={actor.name || actor.enName || 'Имя отсутствует'}
                character={actor.profession}
                imageUrl={actor.photo ? actor.photo : NoImage }
              />
            ))}
          </Grid>
        </>
      )
      : null
  );
};

export default Movie;
