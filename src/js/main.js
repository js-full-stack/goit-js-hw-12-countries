import refs from './refs.js';
import fetchCountries from './fetchCountries';
import {
  updateMarkupCountry,
  updateMarkupCountriesList,
} from './update-markup';

import { defaultModules, error, info, success } from './notification';

const debounce = require('lodash.debounce');

const debouncedOnInput = debounce(requestHandler, 500);
refs.input.addEventListener('input', debouncedOnInput, { passive: true });

function requestHandler() {
  refs.countriesList.innerHTML = '';
  const inputValue = refs.input.value;
  fetchCountries(inputValue).then(data => {
    if (data.length === 1) {
      updateMarkupCountry(data);

      const countryName = data.map(({ name }) => name);
      success({
        text: `Data for the ${countryName} received successfully`,
        delay: 2000,
        maxTextHeight: true,
      });
      return;
    }

    if (data.length > 1 && data.length < 10) {
      updateMarkupCountriesList(data);
      info({
        text: `Matching ${data.length} results`,
        delay: 2000,
        maxTextHeight: true,
      });
      return;
    }

    if (data.length > 10) {
      return error({
        text: 'Too many matches found. Please enter a more specific query',
        delay: 2000,
        maxTextHeight: true,
      });
    }

    if (!data.ok) {
      return error({
        title: 'Error',
        text: `Status: ${data.status}, message: ${data.message}`,
        delay: 2000,
        maxTextHeight: true,
      });
    }
  });
}
