import { useState, useEffect, useCallback } from 'react';
// API
import API from '../API';
// Helpers
import { isPersistedState } from '../utils/helpers';
// Types
import type { Movie } from '../types/types';

export const useMovieFetch = (movieId: number) => {
  const [state, setState] = useState<Movie>({} as Movie);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  const fetchMovie = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);

      const movie = await API.fetchMovie(movieId);

      setState(movie);

      setLoading(false);
    } catch (error) {
      setError(true);
    }
  }, [movieId]);

  useEffect(() => {
    fetchMovie();
    return () => (setState({} as Movie));
  }, []);

  useEffect(() => {
    const sessionState = isPersistedState<Movie>(`${movieId}`);

    if (sessionState) {
      setState(sessionState);
      setLoading(false);
      return;
    }
    fetchMovie();
    return () => (setState({} as Movie));
  }, [movieId, fetchMovie]);

  // Write to sessionStorage
  useEffect(() => {
    sessionStorage.setItem(`${movieId}`, JSON.stringify(state));
  }, [movieId, state])

  return { state, loading, error };
}
