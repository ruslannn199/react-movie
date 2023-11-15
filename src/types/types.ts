import { User } from 'firebase/auth';

export type Person = {
  id: number | null,
  photo: string | null,
  name: string | null,
  enName: string | null,
  description: string,
  profession: string,
  enProfession: string
}

export type Rating = {
  kp: number | null;
  imdb: number | null;
  tmdb: number | null;
}

export type Money = {
  value: number | null;
  currency: string | null;
}

export type Movie = {
  id: number;
  name: string;
  alternativeName: string;
  enName: string;
  year: number;
  description: string;
  shortDescription: string;
  rating: Rating;
  movieLength: number;
  logo: {
    url: string | null;
  }
  poster: {
    url: string | null;
    previewUrl: string | null;
  }
  persons: Person[];
  budget: Money;
  fees: Record<string, Money>;
  releaseYears: {
    start: number | null;
    end: number | null;
  }
}

export type ApiResponse<T> = {
  docs: T[];
  total: number;
  limit: number;
  page: number;
  pages: number;
}

export type Movies = Omit<ApiResponse<Movie>, 'limit'>;

export type ButtonProps = {
  text: string;
  callback: () => void;
}

export type GridProps = {
  header: string;
  children: React.ReactNode;
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
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

export type ThumbProps = {
  image: string;
  clickable: boolean;
  movieId?: number;
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

export type AuthContext = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}
