import { useState, useEffect } from 'react';
// API
import API from '../API';
// Helpers
import { isPersistedState } from '../utils/helpers';
// Types
import type { Movie, MovieState } from '../types/types';

export const useMovieFetch = (movieId: number) => {
  const [state, setState] = useState<MovieState>({
    movie: null,
    directors: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchMovie = async () => {
    try {
      setLoading(true);
      setError(false);

      const movie = await API.fetchMovie(movieId);
      const directors = movie.persons.filter((person) => (person.enProfession === 'director'));
      setState((prev) => ({
        ...prev,
        movie,
        directors,
      }));

      setLoading(false);
    } catch (error) {
      setError(true);
    }
  }

  useEffect(() => {
    const sessionState = isPersistedState<Movie>(`${movieId}`);

    if (sessionState) {
      setState((prev) => ({
        ...prev,
        movie: sessionState,
      }));
      setLoading(false);
      return;
    }
    fetchMovie();
  }, [movieId]);

  // Write to sessionStorage
  useEffect(() => {
    if (state.movie) {
      sessionStorage.setItem(`${movieId}`, JSON.stringify(state.movie));
    }
  }, [movieId, state])

  return { state, loading, error };
}
