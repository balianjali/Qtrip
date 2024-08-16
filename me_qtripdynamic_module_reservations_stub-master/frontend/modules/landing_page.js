import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  let newcities = cities;
  console.log(cities);
  let searchquer = "";
  let searchinput = document.getElementById("input-search").innerHTML;
  let searchbutton = document.getElementById("Search");
  searchbutton.addEventListener('click',()=>{
    searchquer = searchinput.value;
    newcities = cities.filter(city => city.city.toLowerCase().includes(searchquer.toLowerCase()));
  });
  // //Updates the DOM with the cities
  if (cities) {
    newcities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
  const url = "http://127.0.0.1:8082/cities";
  const response = await fetch(url);
  const data = await response.json();
  return data;
  }catch(err){
    alert(err);
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let element = document.createElement("div");
  element.className="col-6 col-lg-3 mb-4";
  element.innerHTML=
      `<a href="pages/adventures/?city=${id}" id='${id}'>
        <div class="tile">
          <div class="tile-text text-centre">
            <h5>${city}</h5>
            <p>${description}</p>
          </div>
          <img class="tile img" src="${image}"/>
        </div>
      </a>`;
      document.getElementById("data").appendChild(element);
}

export { init, fetchCities, addCityToDOM };
