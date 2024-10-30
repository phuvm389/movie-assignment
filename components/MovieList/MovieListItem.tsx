import React from "react";
import { IMovieListItemComp } from "./MovieList.interface";
import Image from "next/image";
import Link from "next/link";

const MovieListItem = ({
  id,
  title,
  posterPath,
  type = "movie",
}: IMovieListItemComp) => {
  return (
    <Link
      href={`/${type}/${id}`}
      aria-label={title}
      className="text-white hover:text-rose-600"
    >
      <Image
        src={`https://image.tmdb.org/t/p/original/${posterPath}`}
        alt={`${title} poster`}
        width={500}
        height={300}
      />
      <h3 className="mt-4 text-base text-lg text-center font-bold link-cover">
        {title}
      </h3>
    </Link>
  );
};

export default MovieListItem;
