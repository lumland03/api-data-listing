console.log('👍 JS Connected');


// Scripting

// Data source
//const url = "";
const url = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";

// Get data
fetch('https://pokeapi.co/api/v2/pokemon/1/')
  .then( response  => response.json())
  .then( data  => {
    
    // check-check: is the data good?
    console.log(data);
    console.log(data.name);
    console.log(data.Image);

    // get container for data
    const dataContainer = document.querySelector(".dataContainer");

    // loop through data
    data.forEach( name => {
      
      // template
      const template = ``;

      // insert EACH `student` record into container
      dataContainer.insertAdjacentHTML("afterbegin", template);
    });
  });

  