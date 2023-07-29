import { useState, useEffect, useCallback } from 'react';
// API
import API from '../API';
// Helpers
import { isPersistedState } from '../helpers';
// Types
import type { MovieState } from '../types/types';

export const useMovieFetch = (movieId: string) => {
  const [state, setState] = useState<MovieState>({} as MovieState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  const fetchMovie = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);

      const movie = await API.fetchMovie(movieId);
      const credits = await API.fetchCredits(movieId);

      // Get directors only
      const directors = credits.crew
        .filter((member) => member.job === 'Director');

      setState({
        ...movie,
        actors: credits.cast,
        directors,
      });

      setLoading(false);
    } catch (error) {
      setError(true);
    }
  }, [movieId]);

  useEffect(() => {
    const sessionState = isPersistedState(movieId);

    if (sessionState) {
      setState(sessionState);
      setLoading(false);
      return;
    }
    fetchMovie();
  }, [movieId, fetchMovie]);

  // Write to sessionStorage
  useEffect(() => {
    sessionStorage.setItem(movieId, JSON.stringify(state));
  }, [movieId, state])

  return { state, loading, error };
}
