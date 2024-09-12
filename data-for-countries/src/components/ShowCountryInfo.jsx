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
      <div key={index} className="country-item">
        <p>{country} <button onClick={() => setCountriesFound([country])}>show</button></p>
      </div>
    ))
  }

  // Conditionally renders details for a specific country if available
  const showSpecificCountryDetails = () => {
    if (!countryDetails) return null; // Guard clause for null countryDetails
    return (
      <div className="country-details">

        <h1>{countryDetails.name.common}</h1>

        <div className="country-info">
          capital: {countryDetails.capital[0]}
          <br></br>
          population: {countryDetails.population.toLocaleString('en-US')}
          <br></br>
          area: {countryDetails.area.toLocaleString('en-US')} km²
          <br></br>
        </div>

        <div className="languages">
          <h2>Languages:</h2>
          <ul>
            {Object.values(countryDetails.languages).map((language, index) => (
              <li key={index}>{language}</li>
            ))}
          </ul>
        </div>

        <div className="flag">
          <img src={countryDetails.flags.png} alt="country flag" />
        </div>

        <div className="weather">
          <h2>In {countryDetails.capital[0]}</h2>
          <Weather 
            countryDetails={countryDetails}
            countryName={countryDetails.name.common} 
            capital={countryDetails.capital[0]}
          />
        </div>

      </div>
    )
  }

  // Determines render based on the number of countries found
  return (
    <>
      {countriesFound.length > 0 && (  // Only render if countriesFound is not empty
        <div className="country-container">
          {countriesFound.length > 10 && <p>Too many matches, please specify another filter</p>}
          {countriesFound.length <= 10 && countriesFound.length > 1 && printListOfCountries()}
          {countriesFound.length === 1 && showSpecificCountryDetails()}
        </div>
      )}
    </>
  );
};

export default ShowCountryInfo;
