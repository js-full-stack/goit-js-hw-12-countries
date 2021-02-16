import refs from './refs.js';
import {
  updateMarkupCountry,
  updateMarkupCountriesList,
} from './update-markup';

import { error, info, success } from './notification';
import debounce from 'lodash.debounce';

const debouncedOnInput = debounce(fetchCountries, 500);
refs.input.addEventListener('input', debouncedOnInput);

function fetchCountries() {
  refs.countriesList.innerHTML = '';
  const inputValue = refs.input.value;
  const url = `https://restcountries.eu/rest/v2/name/${inputValue}`;
  fetch(url)
    .then(res => {
      if (res.ok) return res.json();
      else {
        return error({
          title: `error`,
          text: `status: ${res.status}`,
          delay: 1000,
          maxTextHeight: null,
        });
      }
    })

    .then(data => {
      if (data.length === 1) {
        updateMarkupCountry(data);

        const countryName = data.name[0];
        success({
          text: `Data for the ${countryName} received successfully`,
          delay: 2000,
          maxTextHeight: null,
        });
        return;
      }

      if (data.length > 1 && data.length <= 10) {
        updateMarkupCountriesList(data);
        info({
          text: `Matching ${data.length} results`,
          delay: 2000,
          maxTextHeight: null,
        });
        return;
      }

      if (data.length > 10) {
        return error({
          text: 'Too many matches found. Please enter a more specific query',
          delay: 2000,
          maxTextHeight: null,
        });
      }
    });
}

export default fetchCountries;
