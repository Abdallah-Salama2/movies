import React, { useContext } from "react";
import PersonCard from "../../components/PersonCard";
import { ContextMovies } from "../../components/Store";

export default function People() {
  let { persons } = useContext(ContextMovies);

  return (
    <div className="row justify-content-center">
      {Array.isArray(persons) && persons.length > 0 ? (
        persons.map((person) => (
          <PersonCard key={person.id} person={person} /> // Pass movie object as prop
        ))
      ) : (
        <></>
      )}
    </div>
  );
}
