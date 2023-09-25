import { showMessage, hideMessage } from "./domFunctions";
import {
  extractDateAndTime,
  formatDate,
  formatTime24H,
} from "./helperFunctions";

async function fetchWeatherData(city) {
  let weatherData = "";
  const key = "09da037b5d294e72bb6101013231709";
  try {
    hideMessage("error");
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
        icon_src: `https:${data.current.condition.icon}`,
        feelsLike_c: data.current.feelslike_c,
        feelsLike_f: data.current.feelsLike_f,
        sky_conditions: data.current.condition.text,
      },
      forecast: {
        daily_condition: data.forecast.forecastday[0].day.condition.text,
      },
      wind: {
        degree: data.current.wind_degree,
        direction: data.current.wind_dir,
      },
    },
    dailyConditions: [
      {
        "Wind speed": `${
          Math.round(data.current.wind_kph * 0.28 * 10) / 10
        }m/s`,
      },
      { Humidity: `${data.current.humidity}%` },
      { "UV index": data.current.uv },
      { Visibility: `${data.current.vis_km}km` },
      { Precipitation: `${data.current.precip_mm}mm` },
      {
        "Chance of rain": `${data.forecast.forecastday[0].day.daily_chance_of_rain}%`,
      },
      { Sunrise: formatTime24H(data.forecast.forecastday[0].astro.sunrise) },
      { Sunset: formatTime24H(data.forecast.forecastday[0].astro.sunset) },
      { "Moon phase": data.forecast.forecastday[0].astro.moon_phase },
    ],
    hourly: [],
    daily: [],
  };

  for (let i = 0; i < 24; i++) {
    processedData.hourly[i] = {
      time: extractDateAndTime(
        data.forecast.forecastday[0].hour[i].time
      ).time.slice(0, 2),
      icon_src: `https:${data.forecast.forecastday[0].hour[i].condition.icon}`,
      chance_of_rain: data.forecast.forecastday[0].hour[i].chance_of_rain,
      temperature_c: data.forecast.forecastday[0].hour[i].temp_c,
      temperature_f: data.forecast.forecastday[0].hour[i].temp_f,
    };
  }

  for (let j = 1; j < 8; j++) {
    const timestamp = data.forecast.forecastday[j].date_epoch;
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const newDate = new Date();
    newDate.setTime(timestamp * 1000);
    processedData.daily[j] = {
      // date: formatDate(data.forecast.forecastday[j].date),
      date: days[newDate.getDay()],
      icon_src: `https:${data.forecast.forecastday[j].day.condition.icon}`,
      min_temperature_c: data.forecast.forecastday[j].day.mintemp_c,
      max_temperature_c: data.forecast.forecastday[j].day.maxtemp_c,
      //icon
      //   time: extractDateAndTime(data.forecast.forecastday[0].hour[i].time).time,
      //   // icon: ,
      //   temperature_c: data.forecast.forecastday[0].hour[i].temp_c,
      //   temperature_f: data.forecast.forecastday[0].hour[i].temp_f,
    };
  }
  return processedData;
}

export { fetchWeatherData, processWeatherData };
