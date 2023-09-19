import { fetchWeatherData, processWeatherData } from "./apiFunctions";
import { extractDateAndTime } from "./helperFunctions";

async function populateDOM(data) {
  const locationTitle = document.querySelector(".location-title");
  const locationDate = document.querySelector("#location-date");
  const locationTime = document.querySelector("#location-time");
  const tempText = document.querySelector("#temp-text");
  // const tempIcon = document.querySelector("#temp-icon");
  const tempDescSky = document.querySelector("#sky-conditions");
  const tempDescFeelsLike = document.querySelector("#feels-like");

  try {
    const weatherData = await fetchWeatherData(`${data}`);
    const processedWeatherData = processWeatherData(weatherData);

    locationTitle.textContent = `${processedWeatherData.location.city}, ${processedWeatherData.location.country}`;

    const date = extractDateAndTime(
      processedWeatherData.location.date_time
    ).date;
    locationDate.textContent = `${date}`;

    const time = extractDateAndTime(
      processedWeatherData.location.date_time
    ).time;
    locationTime.textContent = `${time}`;

    tempText.textContent = `${processedWeatherData.weather.temperature_c}`;
    tempDescSky.textContent = `${processedWeatherData.weather.sky_conditions}`;
    tempDescFeelsLike.textContent = `Feels like ${processedWeatherData.weather.feelsLike_c}`;
  } catch (err) {
    alert(err);
  }
}

function showLoading() {
  const loader = document.querySelector("#loading");
  loader.classList.add("active");
}

function hideLoading() {
  const loader = document.querySelector("#loading");
  loader.classList.remove("active");
}

export { populateDOM, showLoading, hideLoading };
