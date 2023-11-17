// Configuration for TMDB API
// Read more about the API here: https://api.kinopoisk.dev/documentation#/

const API_URL: string = 'https://api.kinopoisk.dev/v1.4/';
const API_KEY: string | undefined = import.meta.env.VITE_APP_API_KEY;

const SEARCH_BASE_URL: string = `${API_URL}movie/search`;
const POPULAR_BASE_URL : string= `${API_URL}movie`;


export {
  SEARCH_BASE_URL,
  POPULAR_BASE_URL,
  API_KEY,
};
