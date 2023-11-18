import axios, { AxiosRequestConfig } from 'axios';
import {
  SEARCH_BASE_URL,
  POPULAR_BASE_URL,
  API_KEY,
} from './config';
// Types
import type { ApiResponse, Movie } from './types/types';

const defaultConfig: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': API_KEY!,
  }
}

const defaultSelectedKeys: (keyof Movie)[] = [
  'id', 'alternativeName', 'budget', 'description', 'enName', 'fees', 'logo', 'movieLength',
  'name', 'persons', 'poster', 'rating', 'releaseYears', 'shortDescription', 'year',
]

const apiSettings = {
  fetchMovies: async (searchTerm: string | null, page: number): Promise<ApiResponse<Movie>> => {
    const endpoint: string = searchTerm ? SEARCH_BASE_URL : POPULAR_BASE_URL;
    const config: AxiosRequestConfig = {
      ...defaultConfig,
      params: {
        selectFields: defaultSelectedKeys,
        limit: 20,
        page,
        ...(searchTerm ? { query: searchTerm } : { ticketsOnSale: true }),
      }
    }
    return (await axios.get(endpoint, config)).data;
  },
  fetchMovie: async (movieId: number): Promise<Movie> => {
    const endpoint = `${POPULAR_BASE_URL}/${movieId}`;
    const config: AxiosRequestConfig = {
      ...defaultConfig,
      params: {
        selectFields: defaultSelectedKeys,
      }
    }
    return (await axios.get(endpoint, config)).data;
  },
};

export default apiSettings;
