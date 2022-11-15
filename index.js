//dark mode / light mode testing

const themeIcon = document.querySelector('#theme-icon')
//checks if dark mode supported & if dark mode preferred
if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
  // console.log('dark mode preferred');
  themeIcon.src = 'images/dark-mode-icon.svg'
} else{
  // console.log('dark mode not preferred')
  themeIcon.src = 'images/light-mode-icon.svg'
}

//checks if user changes mode
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if(e.matches){
    // console.log('changed to dark mode')
    themeIcon.src = 'images/dark-mode-icon.svg'
  } else{
    // console.log('changed to light mode')
    themeIcon.src = 'images/light-mode-icon.svg'
  }
})



const breweryResults = document.querySelector('#results')
const cityHeader = document.createElement('h2');
let city;

function searchForm(){
  cityForm = document.querySelector('#search-form');
  cityForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    city = e.target['search-input'].value;

    breweryResults.textContent = "";
    cityHeader.textContent = "";

    let cityUrl = `https://api.openbrewerydb.org/breweries?by_city=${city}&per_page=50`
    searchForBreweries(cityUrl);

    cityForm.reset();
  })
}
searchForm();






function searchForBreweries(cityUrl){
  const cityForm = document.querySelector('#search-form');
  cityHeader.textContent = city.toUpperCase();
  cityForm.append(cityHeader);

  fetch(cityUrl)
  .then(r => r.json())
  .then(breweries => {
    breweries.forEach(brewery => {
      const breweryItem = document.createElement('article');

      const individualBrewery = document.createElement('button');
      individualBrewery.textContent = brewery.name;

      breweryItem.append(individualBrewery);

      breweryResults.append(breweryItem);
      

      individualBrewery.addEventListener('click', (e) => {
        const address = document.createElement('p');
        const phone = document.createElement('p');
        const website = document.createElement('p');

        address.textContent = `${brewery.street}, ${brewery.city}, ${brewery.state} ${brewery.postal_code}`;
        phone.textContent = brewery.phone;
        website.textContent = brewery.website_url;

        individualBrewery.after(address, phone, website);
        
      })
    })
  })
}