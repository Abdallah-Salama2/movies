import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let ContextMovies = createContext(0);

export function ContextMoviesProvider(props) {
  const [tv, setTv] = useState([]);
  const [persons, setPersons] = useState([]);
  const [movies, setMovies] = useState([]);
  const [type, setType] = useState(null);
  console.log(type);
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
    getMovies("movie", setMovies);
    getMovies("person", setPersons);
    getMovies("tv", setTv);
  }, []);
  return (
    <ContextMovies.Provider value={{ movies, persons, tv, type, setType }}>
      {props.children}
    </ContextMovies.Provider>
  );
}
