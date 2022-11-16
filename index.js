const breweryResults = document.querySelector('#results')
const cityHeader = document.createElement('h2');
let city;
let searchField = document.querySelector('#search-input');

window.addEventListener('keyup', (e) => {
  if((e.code === 'Slash') && (document.activeElement.tagName !== "INPUT") && (document.activeElement.tagName !== "TEXTAREA")){
    searchField.focus();
  }
})

const cityForm = document.querySelector('#search-form');
function searchForm(){
  cityForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    city = e.target.elements['search-input'].value;

    breweryResults.textContent = "";
    cityHeader.textContent = "";

    let cityUrl = `https://api.openbrewerydb.org/breweries?by_city=${city}&per_page=50`
    searchForBreweries(cityUrl);

    cityForm.reset();
    searchField.focus();
  })
}
searchForm();

function searchForBreweries(cityUrl){
  cityHeader.textContent = city.toUpperCase();
  cityForm.append(cityHeader);

  fetch(cityUrl)
  .then(r => r.json())
  .then(breweries => {
    breweries.forEach(brewery => {
      renderResults(brewery);
    })
  })
}

function renderResults(brewery){
  const breweryItem = document.createElement('article');

  const individualBrewery = document.createElement('button');
  individualBrewery.textContent = brewery.name;

  breweryItem.append(individualBrewery);
  breweryResults.append(breweryItem);
  
  let clicked = false;
  individualBrewery.addEventListener('click', (e) => {
    const address = document.createElement('p');
    const phone = document.createElement('p');
    const website = document.createElement('p');

    if(clicked === false){
      clicked = true;

      address.textContent = `${brewery.street}, ${brewery.city}, ${brewery.state} ${brewery.postal_code}`;
      phone.textContent = formatPhoneNumber(brewery.phone);
      website.textContent = brewery.website_url;

      individualBrewery.after(address, phone, website); 
    }
  })
}

function formatPhoneNumber(phoneNumber){
  return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/,"($1) $2-$3");
}