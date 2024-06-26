import { useEffect } from 'react';
import countryQuery from '../services/countries';
import Weather from './Weather'

const ShowCountryInfo = ({countriesFound, setCountriesFound, country, countryDetails, setCountryDetails}) => {

  // Fetches specific country details if exactly one country is found
  useEffect(() => {
    if (countriesFound.length === 1) {
      countryQuery.getSpecificCountry(countriesFound[0].toLowerCase())
        .then(countryInfo => {
          setCountryDetails(countryInfo); // Update state with API data
        });
    }
  }, [countriesFound]); // Effect triggers on change in countriesFound

  // Renders list of countries with a button to show each country's details
  const printListOfCountries = () => {
    return countriesFound.map((country, index) => (
      <div key={index}>
        <p>{country} <button onClick={() => setCountriesFound([country])}>show</button></p>
      </div>
    ))
  }

  // Conditionally renders details for a specific country if available
  const showSpecificCountryDetails = () => {
    if (!countryDetails) return null; // Guard clause for null countryDetails
    return (
      <div>
        <h1>{countryDetails.name.common}</h1>
        capital: {countryDetails.capital[0]}
        <br></br>
        population: {countryDetails.population.toLocaleString('en-US')}
        <br></br>
        area: {countryDetails.area.toLocaleString('en-US')} km²
        <br></br>
        <h2>Languages:</h2>
        <ul>
          {Object.values(countryDetails.languages).map((language, index) => (
            <li key={index}>{language}</li>
          ))}
        </ul>

        <img src={countryDetails.flags.png} alt="country flag" />

        <h2>In {countryDetails.capital[0]}</h2>
        <Weather 
          countryDetails={countryDetails}
          countryName={countryDetails.name.common} 
          capital={countryDetails.capital[0]}
        />
      </div>
    )
  }

  // Determines render based on the number of countries found
  if (countriesFound.length > 10) {
    return "Too many countries"; // Return message for large result sets
  } else if (countriesFound.length <= 10 && countriesFound.length > 1) {
    return printListOfCountries(); // Render list of countries
  } else if (countriesFound.length === 1) {
    return showSpecificCountryDetails(); // Render specific country details
  }
};

export default ShowCountryInfo;
