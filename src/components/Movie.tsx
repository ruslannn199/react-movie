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

const Movie: React.FC = () => {
  const { movieId } = useParams();
  const [fee, setFee] = useState<number | null>(null);
  const { state: { movie, directors }, loading, error } = useMovieFetch(parseInt(movieId || '0', 10));
  console.log('MOVIE', movie);

  useEffect(() => {
    if (movie?.fees?.world?.value) {
      setFee(movie.fees.world.value)
    }
    if (movie?.fees?.russia?.value) {
      setFee(movie.fees.russia.value)
    }
    if (movie?.fees?.usa?.value) {
      setFee(movie.fees.usa.value)
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
            budget={movie.budget?.value || 0}
            revenue={fee || 0}
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
