import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { imgPath } from "../../constants/imgPath";
import { ContextMovies } from "../Store";

export default function PersonCard({ person }) {
  let { setType } = useContext(ContextMovies);

  return (
    <div className="col-md-2" key={person.id}>
      <Link
        to={`/details/${person.id}`}
        onClick={() => {
          setType("person");
        }}
        className="text-decoration-none text-white "
        // onClick={()=>{setType("person")}}
      >
        <div className="movieCard w-100">
          <img
            src={imgPath(person.profile_path)}
            alt={person.title}
            className="w-100"
          />
          <h3 className="h5 text-center my-3">
            {person.name ? person.name : "unKnown Name"}
          </h3>
        </div>
      </Link>
    </div>
  );
}
