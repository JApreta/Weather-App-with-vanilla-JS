const apiKey = "3a2f76834c807537970303e3dab30fe7";
let city;
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
    showCurrentTime((response.data.dt * 1000));

    mainImage.setAttribute(
        "src",
        `icons/${response.data.weather[0].icon}.svg`
    );
    mainImage.setAttribute("alt", response.data.weather[0].description);
}

function getCityLiveData(city) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showTemperature).catch((error) => {
        alert("City Not Found");
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

showCurrentLocationLiveData();
document.querySelector('#currentLocation').addEventListener('click', showCurrentLocationLiveData);

function showCurrentTime(timestamp) {
    let currentDate = new Date(timestamp);
    document.querySelector("#date_time").innerHTML = `${
  weekdays[currentDate.getDay()]
} ${currentDate.getHours()}:${
  currentDate.getMinutes() < 10 ? "0" : ""
}${currentDate.getMinutes()}`;
}
document.querySelector("#searchCity").addEventListener("submit", function(e) {
    e.preventDefault();
    city = document.querySelector("#city").value;
    getCityLiveData(city);

});


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