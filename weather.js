const apiKey = "3a2f76834c807537970303e3dab30fe7";
let city = "Tucson";
let temp = document.querySelector("#temperature");
let toCel = document.querySelector("#showTempInC");
let tofahrenheit = document.querySelector("#showTempInF");
let toCel_span = document.querySelector("#showTempInC_span");
let tofahrenheit_span = document.querySelector("#showTempInF_span");
let mainImage = document.querySelector("#main_img");
let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

function showTemperature(response) {

    console.log(response.data);
    let currentTemperature = Math.round(response.data.main.temp);
    document.querySelector('#temperature').innerHTML = currentTemperature;
    document.querySelector("#displayCityName").innerHTML = response.data.name;
    // document.querySelector("#precipitacion").innerHTML = ` Precipitacion: 0%${response.data.main.humidity}`;
    document.querySelector("#humidity").innerHTML = ` Humidity: ${response.data.main.humidity}%`;
    document.querySelector("#wind").innerHTML = ` Wind: ${Math.round(response.data.wind.speed)} km/h`;
    document.querySelector("#description").innerHTML = `${response.data.weather[0].description}`;
    showCurrentTime();

    mainImage.setAttribute(
        "src",
        `icons/${response.data.weather[0].icon}.svg`
    );
    mainImage.setAttribute("alt", response.data.weather[0].description);
}

function formatHours(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours().toString().padStart(2, '0');
    let minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

function dispalyForecast(response) {

    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = null;
    let forecast = null;
    //console.log(response.data.list[0]);

    for (let index = 0; index < 6; index++) {
        forecast = response.data.list[index];
        forecastElement.innerHTML += `
        <div class="col-2">
          <h6>
            ${formatHours(forecast.dt * 1000)}
          </h6>
          <img
            src="icons/${forecast.weather[0].icon}.svg"
          />
          <div class="weather-forecast-temperature">
           ${forecast.pop*100}% <br>
            <strong>
              ${Math.round(forecast.main.temp_max)}°
            </strong>
            ${Math.round(forecast.main.temp_min)}°
          
          </div>
        </div>
      `;
    }
}


function getCityLiveData(city) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showTemperature).catch((error) => {
        alert("City Not Found");
    });
    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(dispalyForecast).catch((error) => {

    });
}


function celsius_to_fahrenheit(temp_in_cel) {
    return Math.round(temp_in_cel * (9 / 5) + 32);
}

function fahrenheit_to_celsius(temp_in_fahrenheit) {
    return Math.round((temp_in_fahrenheit - 32) * (5 / 9));
}


function showCurrentLocationLiveData() {
    navigator.geolocation.getCurrentPosition(function(position) {
        let currentLatitude = position.coords.latitude;
        let currentLongitude = position.coords.longitude;
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLatitude}&lon=${currentLongitude}&appid=${apiKey}&units=metric`;
        axios.get(url).then(showTemperature).catch((error) => {
            alert("City Not Found");
        });
    });
}


document.querySelector('#currentLocation').addEventListener('click', showCurrentLocationLiveData);

function showCurrentTime() {
    let currentDate = new Date();
    document.querySelector("#date_time").innerHTML = `Last Update at ${
        weekdays[currentDate.getDay()]} 
  ${currentDate.getHours().toString().padStart(2, '0')}:${
  currentDate.getMinutes().toString().padStart(2, '0')
}`;
}
document.querySelector("#searchCity").addEventListener("submit", function(e) {
    e.preventDefault();
    city = document.querySelector("#city").value;
    document.querySelector("#city").value = '';
    getCityLiveData(city);

});

getCityLiveData(city);


tofahrenheit.addEventListener("click", function(e) {
    e.preventDefault();
    temp.innerHTML = celsius_to_fahrenheit(temp.textContent);
    if (toCel.classList.contains("hide")) {
        toCel.classList.remove("hide");
        toCel_span.classList.add("hide");
    }

    this.classList.add("hide");
    tofahrenheit_span.classList.remove("hide");
});

toCel.addEventListener("click", function(e) {
    e.preventDefault();
    temp.innerHTML = fahrenheit_to_celsius(temp.textContent);
    if (tofahrenheit.classList.contains("hide")) {
        tofahrenheit.classList.remove("hide");
        tofahrenheit_span.classList.add("hide");
    }
    this.classList.add("hide");
    toCel_span.classList.remove("hide");
});