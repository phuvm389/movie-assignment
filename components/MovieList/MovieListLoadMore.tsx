"use client";
import React, { useEffect, useRef, useState } from "react";
import { IMovieListLoadMoreComp } from "./MovieList.interface";
import MovieListItem from "./MovieListItem";
import useInView from "@/hooks/useInView";
import movieApi from "@/api/movieApi";
import { IMovieList } from "@/api/movieApi.interface";

const MovieListLoadMore = ({ page, query }: IMovieListLoadMoreComp) => {
  const container = useRef<HTMLDivElement | null>(null);
  const { isInView } = useInView(container);
  const [currentPage, setCurrentPage] = useState(page);
  const [resultData, setResultData] = useState<IMovieList>({
    results: [],
    totalResults: 0,
    totalPages: 0,
  });

  useEffect(() => {
    let ignore = false;
    if (isInView) {
      const nextPage = currentPage + 1;
      movieApi
        .getList({
          query,
          page: nextPage,
        })
        .then(async (dataPayload) => {
          if (!ignore) {
            setCurrentPage(nextPage);
            setResultData((prevData) => ({
              ...dataPayload,
              results: [...prevData.results, ...dataPayload?.results],
            }));
          }
        });
    }

    return () => {
      ignore = true;
    };
  }, [isInView]);

  return (
    <>
      {resultData.results.map((item) => {
        return (
          <MovieListItem
            key={`movie-list-load-more-item-${item.id}`}
            {...item}
          />
        );
      })}

      {resultData.totalPages !== currentPage && (
        <div ref={container} className="h-20">
          <div className="absolute left-0 right-0 h-20 flex content-center justify-center text-xl font-bold">
            {"Loading..."}
          </div>
        </div>
      )}
    </>
  );
};

export default MovieListLoadMore;
