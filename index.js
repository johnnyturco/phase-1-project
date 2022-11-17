const breweryResults = document.querySelector('#results')
const cityHeader = document.createElement('h3');
let city;
let searchField = document.querySelector('#search-input');
let cityUrl = `https://api.openbrewerydb.org/breweries?by_city=denver&per_page=50`

window.addEventListener('keyup', (e) => {
  if((e.code === 'Slash') && (document.activeElement.tagName !== 'INPUT') && (document.activeElement.tagName !== 'TEXTAREA')){
    searchField.focus();
  }
})

const cityForm = document.querySelector('#search-form');
function searchForm(){
  cityForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    city = e.target.elements['search-input'].value;

    breweryResults.textContent = '';
    cityHeader.textContent = '';

    let cityUrl = `https://api.openbrewerydb.org/breweries?by_city=${city}&per_page=50`
    searchForBreweries(cityUrl);

    cityForm.reset();
    searchField.focus();
  })
}
searchForm();

function searchForBreweries(cityUrl){
  cityHeader.textContent = city.toUpperCase();
  breweryResults.prepend(cityHeader);

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
  const breweryBtn = document.createElement('button');
  const breweryDetails = document.createElement('div');
  breweryDetails.className = 'brewery-details'
  breweryItem.append(breweryBtn, breweryDetails);

  const address = document.createElement('p');
  breweryDetails.append(address);
  if(brewery.street !== null){
    address.textContent = `${brewery.street}, ${brewery.city}, ${brewery.state} ${brewery.postal_code}`;
  } else{
    address.textContent = `${brewery.city}, ${brewery.state} ${brewery.postal_code}`
  }

  if(brewery.phone !== null){
    const phoneNum = document.createElement('p');
    breweryDetails.append(phoneNum);
    phoneNum.textContent = formatPhoneNumber(brewery.phone)
  }

  if(brewery.website_url !== null){
    const website = document.createElement('p');
    const websiteLink = document.createElement('a');
    website.append(websiteLink);
    breweryDetails.append(website);
    websiteLink.textContent = 'Website';
    websiteLink.setAttribute(`href`, `${brewery.website_url}`);
  }

  breweryBtn.textContent = brewery.name;

  breweryResults.append(breweryItem)

  breweryDetails.style.display = 'none';

  breweryBtn.addEventListener('click', (e) => {
    if(breweryDetails.style.display === 'none'){
      breweryDetails.style.display = 'block';
    } else{
      breweryDetails.style.display ='none'
    }
  })
}

function formatPhoneNumber(phoneNumber){
  return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/,'($1) $2-$3');
}