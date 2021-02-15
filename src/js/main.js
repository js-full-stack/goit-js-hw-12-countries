import refs from './refs.js';
import fetchCountries from './fetchCountries';
import {
  updateMarkupCountry,
  updateMarkupCountriesList,
} from './update-markup';

const debounce = require('lodash.debounce');

const debouncedOnInput = debounce(requestHandler, 500);
refs.input.addEventListener('input', debouncedOnInput);

function requestHandler() {
  const inputValue = refs.input.value;
  fetchCountries(inputValue).then(data => {
    if (data.length === 1) updateMarkupCountry(data);
    else if (data.length > 1 && data.length < 10) {
      updateMarkupCountriesList(data);
    } else {
      console.log('Уточните запрос!');
    }
  });
}
