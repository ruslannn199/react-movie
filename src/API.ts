import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  SEARCH_BASE_URL,
  POPULAR_BASE_URL,
  API_URL,
  API_KEY,
  REQUEST_TOKEN_URL,
  LOGIN_URL,
  SESSION_ID_URL
} from './config';
// Types
import type { ApiResponse, Movie, sessionIdResponse } from './types/types';

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
        selectedFields: defaultSelectedKeys,
        limit: 20,
        page,
        ...(searchTerm ? { query: searchTerm } : {}),
      }
    }
    return (await axios.get(endpoint, config)).data;
  },
  fetchMovie: async (movieId: number): Promise<Movie> => {
    const endpoint = POPULAR_BASE_URL;
    const config: AxiosRequestConfig = {
      ...defaultConfig,
      params: {
        selectedFields: defaultSelectedKeys,
        id: movieId,
      }
    }
    return (await axios.get(endpoint, config)).data;
  },
  // Bonus material below for login
  getRequestToken: async () => {
    const reqToken = await (await fetch(REQUEST_TOKEN_URL)).json();
    return reqToken.request_token;
  },
  authenticate: async (
    requestToken: string,
    username: string,
    password: string): Promise<sessionIdResponse | undefined> => {
    const bodyData = {
      username,
      password,
      request_token: requestToken
    };
    // First authenticate the requestToken
    const response: AxiosResponse<Record<'success', boolean>> = await axios.post(LOGIN_URL, bodyData, defaultConfig);
    // Then get the sessionId with the requestToken
    if (response.data.success) {
      const sessionId: AxiosResponse<sessionIdResponse> = await axios.post(SESSION_ID_URL, { request_token: requestToken }, defaultConfig);
      return sessionId.data;
    }
  },
  rateMovie: async (
    sessionId: string,
    movieId: number,
    value: number) => {
    const endpoint = `${API_URL}movie/${movieId}/rating?api_key=${API_KEY}&session_id=${sessionId}`;
    const rating = await axios.post(endpoint, { value }, defaultConfig);

    return rating.data;
  }
};

export default apiSettings;
