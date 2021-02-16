let addToy = false;


document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const submitNewToy = document.querySelector(".submit");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  function fetchToys(){
    return fetch('http://localhost:3000/toys', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
    .then(function(response){
      return response.json()
    })
    .then(function(json){
      createToyCard(json)
    })
    .catch(function(error){
      console.log(error.message)
    })
  };



  function fetchPostToys(toyName, toyImage){
    return fetch('http://localhost:3000/toys', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "name": toyName,
        "image": toyImage,
        "likes": 0
      })
    })
    .then(function(response){
      return response.json()
    })
    .then(function(json){
      console.log(json)
    })
    .catch(function(error){
      console.log(error.message)
    })
  };



  function createToyCard(toyObject){
    const toysCollection = document.getElementById('toy-collection')

    toyObject.forEach(function(toy){
      const toyDiv = document.createElement('DIV')
      toysCollection.appendChild(toyDiv)
      toyDiv.className = 'card'
      toyDiv.setAttribute('id', `${toy.id}`)
      toyDiv.innerHTML = `
        <h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
        <p>${toy.likes}</p>
        <button class="like-btn">Like <3</button>`

      getToyId(toyDiv, toy.likes);
    })
  };

  

  function getToyId(toy, currentLikes){
    let likes = currentLikes + 1

    toy.addEventListener('click', (e) => {

      let updateLikes = likes++
      toy.querySelector('p').innerHTML = updateLikes

      return fetch(`http://localhost:3000/toys/${toy.id}`, {
          method: 'PATCH',
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            "likes": updateLikes
          })
        })
        .then( (response) => {
          return response.json()
        })
        .then( (json) => {
          console.log(json)
        })
        .catch( (error) => {
          console.log(error.message)
        })

    })
  };



  submitNewToy.addEventListener('click', (event) => {
    
    const toyName = document.querySelectorAll('input')[0].value;
    const toyImage = document.querySelectorAll('input')[1].value;

    fetchPostToys(toyName, toyImage);

    window.location.reload();
    event.preventDefault();
  });

  
  fetchToys();
});


