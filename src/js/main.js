// import searchQuery from './fetchCountries';
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

// let cost;
// const subscription = 'premium';

// switch (subscription) {
//   case 'free':
//     cost = 0;
//     break;

//   case 'pro':
//     cost = 100;
//     break;

//   case 'premium':
//     cost = 500;
//     break;

//   default:
//     console.log('Invalid subscription type');
// }

// console.log(cost); // 500
