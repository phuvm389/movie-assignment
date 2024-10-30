"use client";
import React, { useEffect } from "react";
import MovieListItem from "../MovieList/MovieListItem";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { IMovieListItem } from "@/api/movieApi.interface";
import { fetchInitialState } from "@/store/reducers/userSubmittedSlice";

export const UserSubmittedList = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchInitialState());
  }, []);

  const userSubmitted = useSelector((state: RootState) => state.userSubmitted);
  console.log("userSubmitted", userSubmitted.UserSubmitteds);
  return (
    <div className="user-submitted-list py-12 lg:py-16">
      <h2 className="mb-10">{"User Submitted List"}</h2>
      <div className="grid gap-y-8 gap-x-6 lg:gap-y-12 lg:gap-x-8 grid-cols-2 lg:grid-cols-4">
        {userSubmitted?.UserSubmitteds?.map((item) => {
          const data: IMovieListItem = {
            id: item.id,
            title: item.originalTitle,
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
