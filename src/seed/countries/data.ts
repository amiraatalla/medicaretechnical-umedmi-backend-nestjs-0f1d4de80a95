import * as country from 'i18n-iso-countries';
import * as countryTelephoneCode from 'country-telephone-code';
import { countries, getCitiesByCountryCode } from 'country-city-location';

const getCountries = () => {
  const c = countries;
  return c.map(function(data) {
    const alpha2Code = data.Alpha2Code;
    const arabicName = country.getName(alpha2Code, 'ar');
    const cities = getCitiesByCountryCode(alpha2Code);
    const citiesNames = cities.map(function(data) {
      return data.name;
    });
    let phoneCode = countryTelephoneCode(alpha2Code);
    if (phoneCode) phoneCode = phoneCode[0];
    else phoneCode = '+';
    return {
      name: { en: data.Name, ar: arabicName },
      cities: citiesNames,
      countryCode: alpha2Code,
      flagPath: data.FlagPng,
      phoneCode: phoneCode,
    };
  });
};

export const CountriesData = getCountries();
