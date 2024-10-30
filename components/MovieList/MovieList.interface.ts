import { IMovieListItem } from "@/api/movieApi.interface";

export interface IMovieListComp {
  title: string;
  query: string;
}

export interface IMovieListLoadMoreComp {
  query: string;
  page: number;
}

export interface IMovieListItemComp extends IMovieListItem {}
