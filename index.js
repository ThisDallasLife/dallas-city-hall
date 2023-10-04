async function searchAddress(query) {
  const response = await fetch(CityGIS.findAddressCandidatesUrl(query));
  const json = await response.json();
  const matchingLocations = json.candidates;
  const closestMatch = matchingLocations.reduce((best, current) => current.score > best.score ? current : best);

  return {
    address: closestMatch.address,
    x: closestMatch.location.x,
    y: closestMatch.location.y
  };
}

async function searchCouncil(location) {
  const response = await fetch(CityGIS.findCouncilUrl(location.x, location.y));
  const json = await response.json();

  return {
    address: location.address,
    councilDistrict: json.features[0].attributes.DISTRICT,
    councilMember: json.features[0].attributes.COUNCILPER
  };
}

function renderResults(location) {
  const rep = CityCouncil.members.find((member) => member.district === parseInt(location.councilDistrict));
 
  document.querySelector('#street-address-field').innerHTML = location.address;
  document.querySelector('#district-field').innerHTML = 'District ' + location.councilDistrict;
  document.querySelector('#name-field').innerHTML = rep.name;
  document.querySelector('#email-field').innerHTML = `<a href="mailto:${rep.email}">${rep.email}</a>`;
  document.querySelector('#phone-field').innerHTML = `<a href="tel:${rep.phone.replace(/\D/g,'')}">${rep.phone}</a>`;
  document.querySelector('#rep-photo').src = rep.photo_url;
}

window.addEventListener('DOMContentLoaded', () => {
  const streetAddressForm = document.querySelector('#street-address-form');
  const streetAddressInput = streetAddressForm.querySelector('input[type=text]');
  
  streetAddressForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    searchAddress(streetAddressInput.value)
    .then(searchCouncil)
    .then(renderResults);
  });
});