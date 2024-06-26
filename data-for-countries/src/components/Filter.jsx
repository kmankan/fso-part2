import { useEffect } from 'react';

const Filter = ({country, setCountry, setCountriesFound, countriesFound, listOfAllCountries}) => {
  // handleCountrySearch is triggered on each change in the input field
  const handleCountrySearch = (event) => {
    event.preventDefault(); // Prevents the default action of the form submission since it's in a form element

    // Log the current value of the input field to the console (useful for debugging)
    console.log(event.target.value);

    // Update the country state with the current value of the input field
    setCountry(event.target.value);

    // Store the current value of the input field in a variable for filtering
    const stringToFilterOn = event.target.value;

    // Filter the listOfAllCountries array based on the input value (case-insensitive)
    // This assumes that listOfAllCountries contains strings representing country names
    const filteredArray = listOfAllCountries.filter((country) => {
      const lowerCaseCountry = country.toLowerCase();
      return lowerCaseCountry.includes(stringToFilterOn.toLowerCase());
    });

    // Update the countriesFound state with the filtered array
    // This could trigger updates in other components or effects if they depend on countriesFound
    setCountriesFound(filteredArray);
  }

  // This useEffect is currently an empty dependency effect that does nothing on updates to countriesFound.
  // It might be intended for future expansion, such as fetching new data when countriesFound changes.
  useEffect(() => {
    // Intentionally left empty; future code could go here
  }, [countriesFound]); // Dependency array includes countriesFound to react on its changes
  
  // Render method returning JSX, includes an input field where the user can type to search for countries
  return (
    <div>
      find countries: <input value={country} onChange={handleCountrySearch} />
    </div>
  );
};

export default Filter;
