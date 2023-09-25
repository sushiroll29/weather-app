import { populateDOM } from "./domFunctions";

function extractDateAndTime(input) {
  const inputDate = formatDate(input.slice(0, -5));
  const inputTime = input.slice(-5);
  return {
    date: inputDate,
    time: inputTime,
  };
}

function formatDate(date) {
  return date.slice(0, 10).split("-").reverse().join(".");
}

function searchWeatherByCity() {
  const input = document.querySelector("#search-input");
  const button = document.querySelector("#search-icon");
  let city = "";

  input.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      if (input.value) {
        city = input.value;
      } else return;
      input.value = "";
      populateDOM(city);
    }
  });

  button.addEventListener("click", (e) => {
    e.preventDefault();
    if (input.value) {
      city = input.value;
    } else return;
    input.value = "";
    populateDOM(city);
  });
}

function formatTime24H(time) {
  let formattedTime = "";
  if (time.slice(-2).toLowerCase() == "am") {
    if (time.slice(0, 2) == "12") {
      formattedTime = "00:" + time.slice(3, 5);
    } else {
      formattedTime = time.slice(0, -2);
    }
  } else {
    if (parseInt(time.slice(0, 2)) >= 12) {
      formattedTime = time.slice(0, -2);
    } else {
      let temp = parseInt(time.slice(0, 2)) + 12;
      formattedTime = temp + ":" + time.slice(3, 5);
    }
  }
  return formattedTime;
}

export { extractDateAndTime, searchWeatherByCity, formatDate, formatTime24H };
