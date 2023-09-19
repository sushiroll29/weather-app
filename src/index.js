import { searchWeatherByCity } from "./helperFunctions";
import { populateDOM } from "./domFunctions";
import { fetchWeatherData, processWeatherData } from "./apiFunctions";

// let weatherData = fetchWeatherData("timisoara");

// weatherData
//   .then((response) => processWeatherData(response))
//   .then((res) => console.log(res));
// weatherData.then((res) => console.log(res));
searchWeatherByCity();
populateDOM("timisoara");
