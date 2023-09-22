import { showMessage, hideMessage } from "./domFunctions";
import { extractDateAndTime } from "./helperFunctions";

async function fetchWeatherData(city) {
  let weatherData = "";
  const key = "09da037b5d294e72bb6101013231709";
  try {
    showMessage("loading");
    let response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=8`,
      { mode: "cors" }
    );
    weatherData = await response.json();
  } catch (err) {
    alert(err);
  }
  hideMessage("loading");
  return weatherData;
}

function processWeatherData(data) {
  const processedData = {
    location: {
      city: data.location.name,
      country: data.location.country,
      date_time: data.location.localtime,
    },
    weather: {
      current: {
        temperature_c: data.current.temp_c,
        temperature_f: data.current.temp_f,
        feelsLike_c: data.current.feelslike_c,
        feelsLike_f: data.current.feelsLike_f,
        sky_conditions: data.current.condition.text,
      },
    },
    hourly: [],
    daily: [],
  };

  for (let i = 0; i < 24; i++) {
    processedData.hourly[i] = {
      time: extractDateAndTime(data.forecast.forecastday[0].hour[i].time).time,
      // icon: ,
      temperature_c: data.forecast.forecastday[0].hour[i].temp_c,
      temperature_f: data.forecast.forecastday[0].hour[i].temp_f,
    };
  }
  return processedData;
  //   {

  //       forecast: {
  //         temperature_c: data.forecast.forecastday.temp_c,
  //         temperature_f: data.current.temp_f,
  //         feelsLike_c: data.current.feelslike_c,
  //         feelsLike_f: data.current.feelsLike_f,
  //         sky_conditions: data.current.condition.text,
  //       },
  //     }
}

export { fetchWeatherData, processWeatherData };
