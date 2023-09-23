import { populateDOM } from "./domFunctions"; 

function extractDateAndTime(input) {
    const inputDate = formatDate(input.slice(0, -5));
    const inputTime = input.slice(-5);
    return {
        date: inputDate,
        time: inputTime
    }
}

function formatDate(date) {
        return date.slice(0, 10).split("-").reverse().join(".");
}

function searchWeatherByCity() {
    const input = document.querySelector("input");
    let city = '';

    input.addEventListener('keyup', (e) => {
        if(e.key === 'Enter') {
            if(input.value) {
                city = input.value;
            } else return;  
            input.value = '';
            populateDOM(city);
        }
        
    })
}


export { extractDateAndTime, searchWeatherByCity, formatDate }