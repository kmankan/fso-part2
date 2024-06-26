import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import countryQuery from './services/countries';
import ShowCountryInfo from './components/ShowCountryInfo'

const App = () => {
  // an array of all countries that we will use in our query
  let [listOfAllCountries, setListOfAllCountries] = useState([]);
  // store the string we will be querying the database for
  const [country, setCountry] = useState('')
  // store any country names that match the searched string
  const [countriesFound, setCountriesFound] = useState([]);
  // specific country details
  const [countryDetails, setCountryDetails] = useState(null);

  // creates an array of all country objects
  useEffect(() => {
    countryQuery
      .getAllCountries()
      .then(allCountryInfo => {
        const countryList = allCountryInfo.map(countryInfo => countryInfo.name.common);
        // query all countries from the API, map over these object and extract just the country name and store in array
        setListOfAllCountries(countryList); // Set state
        console.log('All the countries:', countryList);
    });
  }, []); // Empty dependency array ensures this runs once after mount

  return (
    <div>
      <Filter 
      country={country}
      setCountry={setCountry} 
      setCountriesFound={setCountriesFound}
      countriesFound={countriesFound}
      listOfAllCountries={listOfAllCountries}
      />
      <ShowCountryInfo 
      countriesFound={countriesFound}
      country={country}
      countryDetails={countryDetails}
      setCountryDetails={setCountryDetails}
      setCountriesFound={setCountriesFound}
      />
    </div>
  )
  }

export default App