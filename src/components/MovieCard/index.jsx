import React from "react";
import { Link } from "react-router-dom";
import { imgPath } from "../../constants/imgPath";

export default function MovieCard({ movie }) {
  return (
    <div className="col-md-2" key={movie.id}>
      <Link
        to={`/details/${movie.id}`}
        className="text-decoration-none text-white "
        // onClick={()=>{setType("movie")}}
      >
        <div className="movieCard w-100">
          <img
            src={imgPath(movie.poster_path)}
            alt={movie.title}
            className="w-100"
          />

          <h3 className="h5 text-center my-3">
            {movie.title ? movie.title : movie.name ? movie.name : "unkown"}
          </h3>
        </div>
      </Link>
    </div>
  );
}
