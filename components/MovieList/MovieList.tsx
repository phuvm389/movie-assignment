import React from "react";
import { IMovieListComp } from "./MovieList.interface";
import MovieListItem from "./MovieListItem";
import movieApi from "@/api/movieApi";
import MovieListLoadMore from "./MovieListLoadMore";

const MovieList = async ({ title, query }: IMovieListComp) => {
  const list = await movieApi.getList({
    query,
    page: 1,
  });

  return (
    <div className="movie-list py-12 lg:py-16">
      <h2 className="mb-10">{title}</h2>
      <div className="grid gap-y-8 gap-x-6 lg:gap-y-12 lg:gap-x-8 grid-cols-2 lg:grid-cols-4">
        {list.results.map((item) => {
          return <MovieListItem key={`movie-list-item-${item.id}`} {...item} />;
        })}
        <MovieListLoadMore query={query} page={1} />
      </div>
    </div>
  );
};

export default MovieList;
