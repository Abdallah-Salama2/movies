import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { imgPath } from "../../constants/imgPath";

export default function Details() {
  const [movieDetails, setMovieDetails] = useState(null);
  let { id } = useParams();
  function getMovieDetails() {
    axios
      .get(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, {
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNWJmN2M5OGJmNTNjYjZhNTRhNmYyM2QwZjc4OGM2NSIsIm5iZiI6MTcyNzIwNjczOS41MDg0LCJzdWIiOiI2NmYzMTJkOTZjM2I3YThkNjQ4ZTUwZjEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.HOPJjC1OJqhXknfZSyTou3AOEbGZed2uLQfvFL36JFw",
        },
      })
      .then((res) => {
        setMovieDetails(res.data);
        console.log(res.data.results); // Access the actual data
        //   (res.data.results);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  useEffect(() => {
    getMovieDetails();
  });

  return (
    <div className="row">
      <div className="col-md-4 h-100">
        <img
          src={imgPath(movieDetails?.poster_path)}
          alt=""
          className="w-100 h-100"
        />
      </div>
      <div className="col-md-7 offset-1 d-flex flex-column align-items-start justify-content-center">
        <h3>
          <span className="text-info fs-2">Name:</span>
          {movieDetails?.title}
        </h3>
        <h6>
          <span className="text-info fs-2">Overview:</span>
          {movieDetails?.overview}
        </h6>
      </div>
    </div>
  );
}
