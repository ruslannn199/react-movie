import { useState, useEffect } from 'react';
// API
import API from '../API';
// Helpers
import { isPersistedState } from '../utils/helpers';
// Types
import type { Movies } from '../types/types';

const initialState: Movies = {
  docs: [],
  page: 0,
  pages: 0,
  total: 0,
}

export const useHomeFetch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const fetchMovies = async (page: number, searchTerm = '') => {
    try {
      setError(false);
      setLoading(true);

      const movies = await API.fetchMovies(searchTerm, page);

      setState((prev) => ({
        ...movies,
        items: page > 1 ? [...prev.docs, ...movies.docs] : [...movies.docs],
      }));
    } catch (err) {
      console.error(err);
      setError(true);
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchMovies(1);
  }, []);

  // Initial and search
  useEffect(() => {
    if (!searchTerm) {
      const sessionState = isPersistedState<Movies>('homeState');
      if (sessionState) {
        setState(sessionState);
        return;
      }
    }
    setState(initialState);
    fetchMovies(1, searchTerm);
  }, [searchTerm]);

  // Load more
  useEffect(() => {
    if (!isLoadingMore) return;
    fetchMovies(state.page + 1, searchTerm);
    setIsLoadingMore(false);
  }, [isLoadingMore, searchTerm, state.page]);

  // Write to sessionStorage
  useEffect(() => {
    if (!searchTerm) {
      sessionStorage.setItem('homeState', JSON.stringify(state));
    }
  }, [searchTerm, state])

  return { state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore };
}