let url="https://api.openbrewerydb.org/breweries"; 
let breweryOutput= document.getElementById("brewery-output"); //section where brewery data is displayed
let cardsArray = [];  //making a card for each brewery and storing all the cards in this array
let stateInput = document.getElementById("state-input");  //the input element to enter the state by the user
let searchBtn = document.getElementById("search-btn");   //the button to click enter after entering the state
let navMenuBtn = document.getElementById("navMenuBtn");   //the hamburger icon to display the navigation bar menu to display the menu when the app is resized

// the async function to fetch data from the api
const getBreweryData= async (fetchUrl)=>{
    try{
    let breweriesData=await fetch(fetchUrl,{
        method:"GET",
        "Content-Type": "application/json"
    });
    let breweriesDataJson= await breweriesData.json();
    return breweriesDataJson;
}catch(error){
    console.log(error);
}
}


// function to build cards for each brewery obj fetched from the api
const buildCards = (brewery,i)=>{
    let breweryType;
    let brewerystreet;
    let breweryCity;
    let breweryState;
    let breweryPhone;
    let breweryWebsite;

    //handling null values obtained from the api
    brewery.brewery_type ===null? breweryType="NA " : breweryType=brewery.brewery_type;
    brewery.street===null?  brewerystreet =" NA": brewerystreet=brewery.street;
    brewery.city ===null? breweryCity="NA" :breweryCity=brewery.city;
    brewery.state ===null? breweryState="NA" :breweryState=brewery.state;
    brewery.phone ===null? breweryPhone="NA" :breweryPhone=brewery.phone;
    brewery.website_url===null? breweryWebsite = "NA" :breweryWebsite=brewery.website_url;

cardsArray[i]= `<div class="card col-lg-4" >
<div class="card-body">
  <h5 class="card-title">NAME: ${brewery.name}</h5>
  <p class="card-text">TYPE: ${breweryType}</p>
  <p class="card-text">PLACE: ${brewerystreet},${breweryCity},${breweryState}</p>
  <p class="card-text">PHONE: ${breweryPhone}</p>
  <p class="card-text">WEBSITE: <a href="${breweryWebsite}" >${breweryWebsite}</a></p>
</div>
</div>`
}


// the function calls the function which fetches the results from the api and displays on the screen
const breweriesList=(fetchUrl) =>{ 
  let breweriesData=  getBreweryData(fetchUrl)
.then((breweriesData)=>{
 console.log(breweriesData);
 breweriesData.forEach((brewery,i)=>{
    buildCards(brewery,i);
 })

 breweryOutput.innerHTML = cardsArray.join(" ");
 cardsArray=[];
}).catch((err)=>{
     console.log(err);
     alert("Enter valid state")
})
}


breweriesList(url);

//state search button
searchBtn.onclick= ()=>{

   let stateName=stateInput.value.trim().replace(" ","_")

   breweriesList(url+`?by_state=${stateName}`);
}


//nav bar hamburger button
function buttonclick(){
 

  var navBar = document.getElementById("topNavBar");
  

  if (navBar.className === "navBar sticky-top") {
    navBar.className += " responsive";
 
  } else {
    navBar.className = "navBar sticky-top"; //on the second click of the button the menu will be closed

  }
   
}