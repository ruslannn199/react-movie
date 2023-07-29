export type Movie = {
  backdrop_path: string;
  id: number;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  title: string;
  vote_average: number;
  vote_count: number;
  budget: number;
  runtime: number;
  revenue: number;
}

export type Movies = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export type Cast = {
  character: string;
  credit_id: string;
  name: string;
  profile_path: string;
}

export type Crew = {
  job: string;
  name: string;
  credit_id: number;
}

export type Credits = {
  id: number;
  cast: Cast[];
  crew: Crew[];
}

export type ButtonProps = {
  text: string;
  callback: () => void;
}

export type GridProps = {
  header: string;
  children: any;
}

export type HeroImageProps = {
  image: string;
  title: string;
  text: string;
}

export type MovieInfoBarProps = {
  time: number;
  budget: number;
  revenue: number;
}

export type SearchBarProps = {
  'setSearchTerm': React.Dispatch<React.SetStateAction<string>>;
}

export type ThumbProps = {
  image: string;
  clickable: boolean;
  movieId?: number;
}

export type MovieState = Movie & {
  actors: Cast[];
  directors: Crew[];
}

export type ActorProps = {
  name: string;
  character: string;
  imageUrl: string;
}

export type sessionIdResponse = {
  success: boolean;
  session_id?: string;
}

export type successSession = {
  session_id: string;
  username: string;
  value?: number;
}
