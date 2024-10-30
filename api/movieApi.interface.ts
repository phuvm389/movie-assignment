// Requests
export interface IMovieGetList {
  query: string;
  page: number;
}

// Contents
export interface IMovieListItem {
  originalTitle?: string;
  id?: number | string;
  title: string;
  posterPath: string;
  type?: "movie" | "user-submitted" | string;
}

export interface IMovieList {
  results: IMovieListItem[];
  totalResults: number;
  totalPages: number;
}

export interface IMovieDetail {
  originalTitle: string;
  posterPath: string;
  overview?: string;
  genres?: {
    id: number;
    name: string;
  }[];
  releaseDate?: string;
  popularity?: string;
  imdbId?: string;
}

export interface IUserLogin {
  username: string;
  password: string;
}
