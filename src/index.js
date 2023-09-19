async function fetchWeatherData(city) {
    let weatherData = '';

try {
    let response = await fetch(`https://api.weatherapi.com/v1/current.json?key=09da037b5d294e72bb6101013231709&q=${city}`, {mode: 'cors'});
    weatherData = await response.json();
} catch(err) {
    alert(err);
}
return weatherData;
}

async function processWeatherData(data) {
    return {
        location: {
            city: data.location.name,
            country: data.location.country
        },
        weather: {
            temperature_c: data.current.temp_c,
            temperature_f: data.current.temp_f,
            feelsLike_c: data.current.feelslike_c,
            feelsLike_f: data.current.feelsLike_f
        }

    }
}

async function searchWeatherByCity() {
    const input = document.querySelector("input");
    let city = '';

    input.addEventListener('keyup', (e) => {
        if(e.key === 'Enter') {
            if(input.value) {
                city = input.value;
            } else return;  
            input.value = '';
        fetchWeatherData(city).then(response => processWeatherData(response).then(res => console.log(res)) );
        }
        
    })
   
}

let weatherData = fetchWeatherData('timisoara');
weatherData.then(response => processWeatherData(response)
)
.then(res => console.log(res));
searchWeatherByCity();