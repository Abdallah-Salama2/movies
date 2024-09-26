import React, { useContext, } from "react";
import MovieCard from "../../components/MovieCard";
import { ContextMovies } from "../../components/Store";

export default function Movies() {
  let { movies } = useContext(ContextMovies);

  return (
    <div className="row justify-content-center">
      {Array.isArray(movies) && movies.length > 0 ? (
        movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} /> // Pass movie object as prop
        ))
      ) : (
        <></>
      )}
    </div>
  );
}
