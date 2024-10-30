import React from "react";
import { IMovieDetail } from "@/api/movieApi.interface";
import Image from "next/image";
import Link from "next/link";
import classnames from "classnames";
import styles from "./MovieDetail.module.scss";

const MovieDetail = ({
  originalTitle,
  posterPath,
  overview,
  genres,
  releaseDate,
  popularity,
  imdbId,
}: IMovieDetail) => {
  return (
    <div
      className={classnames(
        "movie-detail md:flex py-12 lg:py-16",
        styles["movie-detail"]
      )}
    >
      <div className="movie-detail__image max-w-full mb-10 md:mb-0">
        <Image
          src={`https://image.tmdb.org/t/p/original/${posterPath}`}
          alt={`${originalTitle} poster`}
          width={320}
          height={480}
        />
      </div>
      <div className="movie-detail__content md:pl-10 text-lg">
        <h1 className="mb-4">{originalTitle}</h1>
        {releaseDate && (
          <div className="mb-4">
            <strong>{"Description: "}</strong>
            <p>{overview}</p>
          </div>
        )}
        {releaseDate && (
          <div className="mb-2">
            <strong>{"Release Date: "}</strong>
            <span>{releaseDate}</span>
          </div>
        )}
        {popularity && (
          <div className="mb-2">
            <strong>{"Popularity: "}</strong>
            <span>{popularity}</span>
          </div>
        )}
        {genres && genres.length > 0 && (
          <div className="mb-2">
            <strong>{"Genres: "}</strong>
            {genres.map((item, index) => {
              if (index + 1 !== genres.length)
                return <span key={`genres-${item.id}`}>{item.name}, </span>;
              return <span key={`genres-${item.id}`}>{item.name}</span>;
            })}
          </div>
        )}
        {imdbId && (
          <Link
            href={`https://www.imdb.com/title/${imdbId}`}
            target="_blank"
            className="font-bold"
          >
            {"Link to imdb.com "}
          </Link>
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
