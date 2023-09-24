import { fetchWeatherData, processWeatherData } from "./apiFunctions";
import { extractDateAndTime } from "./helperFunctions";

async function populateDOM(data) {
  const locationTitle = document.querySelector(".location-title");
  const locationDate = document.querySelector("#location-date");
  const locationTime = document.querySelector("#location-time");
  const tempText = document.querySelector("#temp-text");
  const tempIcon = document.querySelector("#temp-icon");
  const tempDescSky = document.querySelector("#sky-conditions");
  const tempDescFeelsLike = document.querySelector("#feels-like");

  try {
    const weatherData = await fetchWeatherData(`${data}`);
    const processedWeatherData = processWeatherData(weatherData);

    locationTitle.textContent = `${processedWeatherData.location.city}, ${processedWeatherData.location.country}`;

    const date = extractDateAndTime(
      processedWeatherData.location.date_time
    ).date;
    locationDate.textContent = `${date} | `;

    const time = extractDateAndTime(
      processedWeatherData.location.date_time
    ).time;
    locationTime.textContent = `${time}`;

    tempIcon.src = `${processedWeatherData.weather.current.icon_src}`;
    tempText.textContent = `${processedWeatherData.weather.current.temperature_c}°C`;
    tempDescSky.textContent = `${processedWeatherData.weather.current.sky_conditions}`;
    tempDescFeelsLike.textContent = `Feels like ${processedWeatherData.weather.current.feelsLike_c}°C`;

    showDailyForecastConditions(processedWeatherData);
    createDailyConditionsGrid(processedWeatherData.dailyConditions);
    createHourlyDisplay(processedWeatherData.hourly);
    createWeeklyDisplay(processedWeatherData.daily);
  } catch (err) {
    console.log(err);
  }
}

function createHourlyDisplay(hourlyData) {
  const mainContainer = document.querySelector(".weather-main");
  const hourlyDisplay = document.querySelector("#hourly-display");
  const hourlyListWrapper = document.querySelector(".hourly-content");

  hourlyListWrapper.textContent = "";

  for (let i = 0; i < 24; i++) {
    const hourlyContainer = document.createElement("li");
    hourlyContainer.classList.add("hourly-wrapper-item");
    hourlyContainer.id = `${i}`;

    const time = document.createElement("span");
    time.classList.add("hourly-time");
    time.textContent = hourlyData[i].time;

    const icon = document.createElement("img");
    icon.classList.add("hourly-icon");
    icon.src = hourlyData[i].icon_src;

    const chanceOfRain = document.createElement("span");
    chanceOfRain.classList.add("hourly-rain");
    chanceOfRain.textContent = `${hourlyData[i].chance_of_rain}%`;

    const temp = document.createElement("span");
    temp.classList.add("hourly-temp");
    temp.textContent = `${hourlyData[i].temperature_c}°`;

    hourlyContainer.append(time, icon, chanceOfRain, temp);
    hourlyListWrapper.append(hourlyContainer);
    hourlyDisplay.appendChild(hourlyListWrapper);
  }
  mainContainer.appendChild(hourlyDisplay);
  hourlyDisplaySlider();
}

function hourlyDisplaySlider() {
  const hourlyListWrapper = document.querySelector(".hourly-content");
  const prevButton = document.getElementById("slide-arrow-prev");
  const nextButton = document.getElementById("slide-arrow-next");

  nextButton.addEventListener("click", (e) => {
    const slideWidth = hourlyListWrapper.clientWidth;
    hourlyListWrapper.scrollLeft += slideWidth;
  });

  prevButton.addEventListener("click", () => {
    const slideWidth = hourlyListWrapper.clientWidth;
    hourlyListWrapper.scrollLeft -= slideWidth;
  });
}

function createWeeklyDisplay(weeklyData) {
  const mainContainer = document.querySelector(".weather-main");
  const weeklyDisplay = document.querySelector("#weekly-display");
  const weeklyListWrapper = document.querySelector(".weekly-content");

  weeklyListWrapper.textContent = "";

  for (let j = 1; j < 8; j++) {
    const weeklyContainer = document.createElement("li");
    weeklyContainer.classList.add("weekly-wrapper-item");
    weeklyContainer.id = j;

    const day = document.createElement("span");
    day.classList.add("weekly-day");
    day.textContent = weeklyData[j].date;

    const icon = document.createElement("img");
    icon.classList.add("weekly-icon");
    icon.src = weeklyData[j].icon_src;

    const minTemp = document.createElement("span");
    minTemp.classList.add("weekly-min-temp");
    minTemp.textContent = `${weeklyData[j].min_temperature_c}°C`;

    const maxTemp = document.createElement("span");
    maxTemp.classList.add("weekly-max-temp");
    maxTemp.textContent = `${weeklyData[j].max_temperature_c}°C`;


    weeklyContainer.append(day, icon, minTemp, maxTemp);
    weeklyListWrapper.appendChild(weeklyContainer);
    weeklyDisplay.appendChild(weeklyListWrapper);
  }
  mainContainer.appendChild(weeklyDisplay);
}

function createDailyConditionsGrid(data) {
  const dailyCondGrid = document.querySelector("#daily-conditions");

  dailyCondGrid.textContent = "";

  for (let k = 0; k < 9; k++) {
    const gridItem = document.createElement("div");
    gridItem.classList.add("daily-condition");
    gridItem.id = k;

    const gridItemTitle = document.createElement("p");
    gridItemTitle.classList.add("daily-condition-title");
    gridItemTitle.textContent = `${Object.keys(data[k])}`;

    const gridItemValue = document.createElement("p");
    gridItemValue.classList.add("daily-condition-value");
    gridItemValue.textContent = `${Object.values(data[k])}`;

    gridItem.append(gridItemTitle, gridItemValue);
    dailyCondGrid.appendChild(gridItem);
  }
}

function showDailyForecastConditions(data) {
  const conditionsText = document.querySelector("#daily-forecast-conditions");
  conditionsText.textContent = `${data.weather.forecast.daily_condition} today`;
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
