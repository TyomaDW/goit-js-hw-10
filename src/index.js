import './css/styles.css';
import Notiflix from 'notiflix';
import getRefs from './js/refs';
import fetchCountriesList from '../src/templates/countryList.hbs';
import countryTemplate from '../src/templates/countryInfo.hbs';
import { fetchCountries } from '../src/js/fetchCountries';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
const refs = getRefs();

refs.inputEl.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  const form = e.currentTarget;
  let searchQuery = document.getElementById('search-box').value.trim();
  if (!searchQuery) {
    onFetchError();
    return;
  }
  fetchCountries(searchQuery).then(createCountryList).catch(onFetchError);
}

function renderCountryCard(country) {
  const markup = countryTemplate(country);

  refs.countryInfo.innerHTML = markup;
}
function renderCountriesList(countries) {
  countries.forEach(country => {
    const markup = fetchCountriesList(country);
    refs.countryList.insertAdjacentHTML('beforeend', markup);
  });
}

function onFetchError(error) {
  clear();
  Notiflix.Notify.failure('Oops, there is no country with that name!!!');
}

function createCountryList(numberOfCountries) {
  if (numberOfCountries.length <= 1) {
    clear();
    renderCountryCard(numberOfCountries);
  }
  if (numberOfCountries.length > 1 && numberOfCountries.length <= 10) {
    clear();
    renderCountriesList(numberOfCountries);
  }
  if (numberOfCountries.length > 10) {
    clear();
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
  }
}
function clear() {
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';
}
