import { showLoading, hideLoading } from "./domFunctions";

async function fetchWeatherData(city) {
  let weatherData = "";

  try {
    showLoading();
    let response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=09da037b5d294e72bb6101013231709&q=${city}`,
      { mode: "cors" }
    );
    weatherData = await response.json();
  } catch (err) {
    alert(err);
  }
  hideLoading();
  return weatherData;
}

function processWeatherData(data) {
  return {
    location: {
      city: data.location.name,
      country: data.location.country,
      date_time: data.location.localtime,
    },
    weather: {
      temperature_c: data.current.temp_c,
      temperature_f: data.current.temp_f,
      feelsLike_c: data.current.feelslike_c,
      feelsLike_f: data.current.feelsLike_f,

      sky_conditions: data.current.condition.text,
    },
  };
}

export { fetchWeatherData, processWeatherData };
