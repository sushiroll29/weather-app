import { fetchWeatherData, processWeatherData } from "./apiFunctions";
import { extractDateAndTime } from "./helperFunctions";

async function populateDOM(data) {
  const mainContainer = document.querySelector(".weather-main");
  // const error = document.querySelector(".error");
  const locationTitle = document.querySelector(".location-title");
  const locationDate = document.querySelector("#location-date");
  const locationTime = document.querySelector("#location-time");
  const tempText = document.querySelector("#temp-text");
  // const tempIcon = document.querySelector("#temp-icon");
  const tempDescSky = document.querySelector("#sky-conditions");
  const tempDescFeelsLike = document.querySelector("#feels-like");
  const hourlyDisplay = document.querySelector("#hourly-display");

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

    tempText.textContent = `${processedWeatherData.weather.current.temperature_c}°C`;
    tempDescSky.textContent = `${processedWeatherData.weather.current.sky_conditions}`;
    tempDescFeelsLike.textContent = `Feels like ${processedWeatherData.weather.current.feelsLike_c}°C`;

    //    createHourlyDisplay(processedWeatherData.hourly);
    // hourlyDisplay.textContent = createHourlyDisplay(processedWeatherData.hourly);
    // console.log(processedWeatherData.hourly);
    createHourlyDisplay(processedWeatherData.hourly);
    hourlyDisplaySlider();
  } catch (err) {
    console.log(err);
  }
}

function createHourlyDisplay(hourlyData) {
  const mainContainer = document.querySelector(".weather-main");
  const hourlyDisplay = document.querySelector("#hourly-display");
  const listWrapper = document.querySelector(".hourly-content");

  listWrapper.textContent = "";

  for (let i = 0; i < 24; i++) {
    const hourlyContainer = document.createElement("li");
    hourlyContainer.classList.add("hourly-wrapper-item");
    hourlyContainer.id = `${i}`;

    const time = document.createElement("span");
    time.classList.add("hourly-time");
    time.textContent = hourlyData[i].time;

    const temp = document.createElement("span");
    temp.classList.add("hourly-temp");
    temp.textContent = `${hourlyData[i].temperature_c}°C`;

    hourlyContainer.append(time, temp);
    listWrapper.append(hourlyContainer);
    hourlyDisplay.appendChild(listWrapper);
  }
  mainContainer.appendChild(hourlyDisplay);
}

function hourlyDisplaySlider() {
  const hourlyDisplayElement = document.querySelector(".hourly-wrapper-item");
  const listWrapper = document.querySelector(".hourly-content");
  const prevButton = document.getElementById("slide-arrow-prev");
  const nextButton = document.getElementById("slide-arrow-next");

  nextButton.addEventListener("click", (e) => {
    const slideWidth = listWrapper.clientWidth;
    listWrapper.scrollLeft += slideWidth;
  });

  prevButton.addEventListener("click", () => {
    const slideWidth = listWrapper.clientWidth;
    listWrapper.scrollLeft -= slideWidth;
  });
}

function createWeeklyDisplay(info) {
  const mainContainer = document.querySelector(".weather-main");
  const hourlyDisplay = document.querySelector("#hourly-display");
}

function showMessage(elementId) {
  const loader = document.querySelector(`#${elementId}`);
  const content = document.querySelector(".content");
  content.style.display = "none";
  loader.classList.add("active");
}

function hideMessage(elementId) {
  const loader = document.querySelector(`#${elementId}`);
  const content = document.querySelector(".content");
  content.style.display = "block";
  loader.classList.remove("active");
}

export { populateDOM, showMessage, hideMessage };
