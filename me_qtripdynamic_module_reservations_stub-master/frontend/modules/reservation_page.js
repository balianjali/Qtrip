import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
    let result = await fetch(
      config.backendEndpoint + `/reservations/`
    );
    const datam = await result.json();
    console.log(datam);
    return datam;
  }catch(error){
    return null;
  }

  // Place holder for functionality to work in the Stubs
  return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
   if(reservations.length>0){
    document.getElementById("reservation-table-parent").style.display="block";
    document.getElementById("no-reservation-banner").style.display="none";
   }else{
    document.getElementById("reservation-table-parent").style.display="none";
    document.getElementById("no-reservation-banner").style.display="block";
   }
  //  let tb = document.getElementById("reservation-table-parent")
   reservations.map((key,index)=>{
    let elem = document.createElement("tr");
    elem.innerHTML = `
    <th scope="row">${key.id}</th>
    <td scope="row">${key.name}</td>
    <td>${key.adventureName}</td>
    <td>${key.person}</td>
    <td>${key.date}</td>
    <td>${key.price}</td>
    <td>${new Date(key.time).toLocaleString("en-IN",{
      year:"numeric",
      day:"numeric",
      month:"long",
      hour:"numeric",
      minute:"numeric",
      second:"numeric",
      hour12:true,
    })}</td>
    <td><div class="reservation-visit-button id=${key.id}>
    <a href="../detail/?adventure=${key.adventure}">Visit Adventure</a></div></td>`;
    document.getElementById("reservation-table").appendChild(elem);
   });
}

export { fetchReservations, addReservationToTable };
