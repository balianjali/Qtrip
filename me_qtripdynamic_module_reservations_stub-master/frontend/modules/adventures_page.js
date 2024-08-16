
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const test = new URLSearchParams(location.search);
  
  // const test = new URLSearchParams(location.search);
  const city = test.get("city");
  return city;

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
    const result = await fetch(
      config.backendEndpoint + `/adventures?city=${city}`
    );
    const data = await result.json();
    console.log(data);
    return data;
  }catch(e){
    return null;
  }
  

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  // console.log(adventures);
  adventures.forEach(key => {
    let ele = document.createElement("div");
    ele.className="col-6 col-lg-3 mb-3 adventure-cards";
    ele.innerHTML=`<a href="detail/?adventure=${key.id}" id=${key.id}>
                        <div class="card activity-card">
                         <div class="category-banner">${key.category}</div>
                            <img class="img-responsive activity-card-image"
                                  src=${key.image}/>
                            <div class="card-body text-center d-md-flex justify-content-between"
                              <div>
                                 <h5 class="card-title me-5">${key.name}</h5>
                                 <p class="card-text">₹${key.costPerHead}</p>
                              </div>
                              <div class="d-flex align-items-between" >
                                 <h5 class="card-title me-5">Duration</h5>
                                 <p class="card-text">${key.duration} hours</p>
                              </div>
                            </div>
                        </div>
                      </a>`;
      document.getElementById("data").appendChild(ele);
     
                      
    
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  const filtered_list = list.filter(
    (key)=>key.duration>low && key.duration<=high
  );
  return filtered_list;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  const filtered_list = list.filter(adventure=>categoryList.includes(adventure.category));
  return filtered_list;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  let filtered_list =[];
  if(filters["duration"].length>0 && filters["category"].length>0){
       let choice = filters["duration"].split("-");
       filtered_list=filterByDuration(list,parseInt(choice[0]),parseInt([choice[1]]));
       filtered_list=filterByCategory(filtered_list,filters["category"]);
  }else if(filters["duration"].length>0){
      let choice = filters["duration"].split("-");
      filtered_list=filterByDuration(list,parseInt(choice[0]),parseInt([choice[1]]));
 }else if(filters["category"].length>0){
  filtered_list=filterByCategory(list,filters["category"]);
 }else{
  filtered_list=list;
 }
 return filtered_list;

  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters",JSON.stringify(filters));

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

   return JSON.parse(localStorage.getItem("filters"));
  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
   document.getElementById("duration-select").value=filters.duration;
   filters["category"].forEach((key)=>{
    let ele = createElement("div");
    ele.className="category-filter";
    ele.innerHTML=`<div>${key}</div>`;
    document.getElementById("category-list").appendChild(ele);
   });
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
