"use client";
import React from "react";
import MovieListItem from "../MovieList/MovieListItem";
import { IMovieListItemComp } from "../MovieList/MovieList.interface";

export interface IMovieList2Comp {
  list: IMovieListItemComp[];
}

export const UserSubmittedList2 = ({ list }: IMovieList2Comp) => {
  return (
    <div className="user-submitted-list py-12 lg:py-16">
      <h2 className="mb-10">{"User Submitted List"}</h2>
      <div className="grid gap-y-8 gap-x-6 lg:gap-y-12 lg:gap-x-8 grid-cols-2 lg:grid-cols-4">
        {list?.map((item) => {
          const data = {
            id: item.id,
            title: item.originalTitle ? item.originalTitle : "title",
            posterPath: item.posterPath,
            type: "user-submitted",
          };
          return (
            <MovieListItem
              key={`user-submitted-list-load-more-item-${item.id}`}
              {...data}
            />
          );
        })}
      </div>
    </div>
  );
};
