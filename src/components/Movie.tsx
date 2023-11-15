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
  const { state: movie, loading, error } = useMovieFetch(parseInt(movieId || '0', 10));
  const [fee, setFee] = useState<number | null>(null);

  useEffect(() => {
    if (movie.fees.world && movie.fees.world.value) {
      setFee(movie.fees.world.value)
    }
    if (movie.fees.russia && movie.fees.russia.value) {
      setFee(movie.fees.russia.value)
    }
    if (movie.fees.usa && movie.fees.usa.value) {
      setFee(movie.fees.usa.value)
    }
  }, []);

  console.log(movie);

  if (loading) return <Spinner />;
  if (error) return <div>Something went wrong...</div>
  
  return (
    <>
      <BreadCrumb movieTitle={movie.name || movie.alternativeName || movie.enName} />
      <MovieInfo movie={movie} />
      <MovieInfoBar
        time={movie.movieLength}
        budget={movie.budget.value || 0}
        revenue={fee || 0}
      />
      {/* <Grid header='Actors'>
        {movie.staff.map((actor) => (
          <Actor
            key={actor.staffId}
            name={actor.nameRu || actor.nameEn || 'No name'}
            character={actor.professionText}
            imageUrl={
              actor.posterUrl
               ? actor.posterUrl
               : NoImage
            }
          />
        ))}
      </Grid> */}
    </>
  );
};

export default Movie;
