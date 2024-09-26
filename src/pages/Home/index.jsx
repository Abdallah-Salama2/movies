import React, { useContext } from "react";
import "./style.css";
import "../../constants/imgPath";
import MovieCard from "../../components/MovieCard";
import PersonCard from "../../components/PersonCard";
import { imgPath } from "../../constants/imgPath";
import { ContextMovies } from "../../components/Store";
export default function Home() {
  let { movies, persons, tv } = useContext(ContextMovies);
  return (
    <div>
      <div className="row my-5">
        <div className="col-md-4   d-flex align-items-center">
          <div className="border border-secondary border-start-0 py-5 border-end-0">
            <h2>
              Trending <br /> Movies <br /> To Watch Right Now
            </h2>
            <p className="text-primary">Top Trending Movies by Day</p>
          </div>
        </div>
        {movies.slice(0, 10).map((movie) => {
          return <MovieCard movie={movie} />;
        })}
      </div>
      <hr />
      <div className="row my-5">
        <div className="col-md-4   d-flex align-items-center">
          <div className="border border-secondary border-start-0 py-5 border-end-0">
            <h2>
              Trending <br /> Actors <br /> To Watch Right Now
            </h2>
            <p className="text-primary">Top Trending Actors by Day</p>
          </div>
        </div>
        {persons.slice(0, 10).map((person) => {
          return <PersonCard person={person} />;
        })}
      </div>
      <hr />

      <div className="row my-5">
        <div className="col-md-4   d-flex align-items-center">
          <div className="border border-secondary border-start-0 py-5 border-end-0">
            <h2>
              Trending <br /> Series <br /> To Watch Right Now
            </h2>
            <p className="text-primary">Top Trending Series by Day</p>
          </div>
        </div>
        {tv.slice(0, 10).map((tv) => {
          return (
            <div className="col-md-2" key={tv.id}>
              <div className="movieCard w-100">
                <img
                  src={imgPath(tv.poster_path)}
                  alt={tv.name}
                  className="w-100"
                />
                <h3>{tv.name ? tv.name : "unKnown Name"}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
