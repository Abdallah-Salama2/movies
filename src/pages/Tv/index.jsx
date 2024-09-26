import axios from "axios";
import React, { useEffect, useState } from "react";
import MovieCard from "../../components/MovieCard";

export default function Tv() {
  const [tv, setTv] = useState([]);

  function getMovies(type, callback) {
    axios
      .get(`https://api.themoviedb.org/3/trending/${type}/day?language=en-US`, {
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNWJmN2M5OGJmNTNjYjZhNTRhNmYyM2QwZjc4OGM2NSIsIm5iZiI6MTcyNzIwNjczOS41MDg0LCJzdWIiOiI2NmYzMTJkOTZjM2I3YThkNjQ4ZTUwZjEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.HOPJjC1OJqhXknfZSyTou3AOEbGZed2uLQfvFL36JFw",
        },
      })
      .then((res) => {
        console.log(res.data.results); // Access the actual data
        callback(res.data.results);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  useEffect(() => {
    getMovies("tv", setTv);
  }, []);

  return (
    <div className="row justify-content-center">
      {tv.map((tv) => {
        return <MovieCard key={tv.id} movie={tv} />; // Pass movie object as prop
      })}
    </div>
  );
}
