const breweryResults = document.querySelector('#brewery-results')
function searchForm(){
  const cityForm = document.querySelector('#search-city-form');
  cityForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const city = e.target['city-input'].value;

    const cityHeader = document.createElement('h2');
    cityHeader.textContent = city;
    cityForm.append(cityHeader);

    breweryResults.textContent = "";
    let cityUrl = `https://api.openbrewerydb.org/breweries?by_city=${city}&per_page=50`

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
      const individualBrewery = document.createElement('li')
      individualBrewery.textContent = brewery.name
      breweryResults.append(individualBrewery)

      individualBrewery.addEventListener('click', (e) => {
        const address = document.createElement('p');
        const phone = document.createElement('p');
        const website = document.createElement('p');

        address.textContent = `${brewery.street}, ${brewery.city}, ${brewery.state} ${brewery.postal_code}`;
        phone.textContent = brewery.phone
        website.textContent = brewery.website_url

        individualBrewery.append(address, phone, website);
      })
    })
  })
}