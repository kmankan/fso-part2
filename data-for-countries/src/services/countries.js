import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'

const getAllCountries = () => {
  const request = axios.get(`${baseUrl}/all`)
  return request.then(response => response.data)
}

const getSpecificCountry = (country) => {
  const request = axios.get(`${baseUrl}/name/${country}`)
  return request.then(response => response.data)
}

const getGeoCodingFor = (capital) => {
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${capital}&limit=1&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
  const request = axios.get(url)
  return request.then(response => response.data)
}

const getWeatherInfoFor = (lat, lon) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`
  const request = axios.get(url)
  return request.then(response => response.data)
}

const getDateTimeInfo = (lat, lon) => {
  const url = `https://api.ipgeolocation.io/timezone?apiKey=${import.meta.env.VITE_DATETIME_API_KEY}&lat=${lat}&long=${lon}`
  const request = axios.get(url)
  return request.then(response => response.data)
}


export default { getAllCountries, getSpecificCountry, getGeoCodingFor, getWeatherInfoFor, getDateTimeInfo }