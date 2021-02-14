import countryTemplate from '../templates/main-template.hbs';
import countriesList from '../templates/list-template.hbs';
import refs from '../js/refs';

export const updateMarkupCountry = function (country) {
  const markup = countryTemplate(country);
  refs.countriesList.innerHTML = markup;
};

export const updateMarkupCountriesList = function (countries) {
  const markup = countriesList(countries);
  refs.countriesList.innerHTML = markup;
};
