import React, { useEffect, useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  // useEffect(()=>{
  //   fetch("http://localhost:3001/pets")
  //   .then(resp=>resp.json())
  //   .then(data=>setPets(data))
  // })

  function handleFilter(value){
    setFilters({type: value})
  }

  function handleFindPets(){
    filters.type === "all" ?
    fetch("http://localhost:3001/pets")
    .then(resp=>resp.json())
    .then(data=>
      setPets(data))
    :
    fetch(`http://localhost:3001/pets?type=${filters.type}`)
    .then(resp=>resp.json())
    .then(data=>setPets(data))
  }
  console.log(pets)

  function handleAdoptPet(petId){
    const adoptedPet = pets.filter(pet => pet.id === petId)

    adoptedPet[0].isAdopted = true
    const updatedPets = pets.map(pet => pet.id === petId? adoptedPet[0] : pet)
    
    setPets(updatedPets)

    // fetch(`http://localhost:3001/pets?id=${petId}`, {
    //   method: "PATCH",
    //   headers:{
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({isAdopted: true})
    // })
    // .then(resp=>resp.json)
    // .then(data=>console.log(data))
  }

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters onChangeType={handleFilter} onFindPetsClick={handleFindPets}/>
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={handleAdoptPet}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
