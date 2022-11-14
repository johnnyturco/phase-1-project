const breweryResults = document.querySelector('#brewery-results')
function searchForm(){
  const cityForm = document.querySelector('#search-city-form');
  cityForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    breweryResults.textContent = "";
    let cityUrl = `https://api.openbrewerydb.org/breweries?by_city=${e.target['city-input'].value}`

    searchForBreweries(cityUrl);

    cityForm.reset();
  })
}
searchForm();

function searchForBreweries(cityUrl){
  fetch(cityUrl)
  .then(r => r.json())
  .then(breweries => {
    breweries.forEach(brewery => {
      //console.log(brewery.name)
      const individualBrewery = document.createElement('li')
      individualBrewery.textContent = brewery.name
      breweryResults.append(individualBrewery)
    })
  })
}