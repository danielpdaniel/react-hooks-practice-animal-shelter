import React from "react";

import Pet from "./Pet";

function PetBrowser({ pets, onAdoptPet }) {
  return <div className="ui cards">{
    pets ? pets.map(pet=> <Pet key={pet.id} pet={pet} onAdoptPet={onAdoptPet}/>)
    : <h2>Loading...</h2>
}
</div>;
}

export default PetBrowser;
