function searchByCity(){
  const cityForm = document.querySelector('#search-city-form');
  cityForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let city = e.target['city-input'].value;
    let cityUrl = `https://api.openbrewerydb.org/breweries?by_city=${city}&per_page=10`

    fetch(cityUrl)
      .then(r => r.json())
      .then(breweries => {
        breweries.forEach(brewery => {
        console.log(brewery.name)
    })
  })
  })
}
searchByCity();