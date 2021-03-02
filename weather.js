const apiKey = "3a2f76834c807537970303e3dab30fe7";
let city;
let temp = document.querySelector("#temperature");
let toCel = document.querySelector("#showTempInC");
let toFar = document.querySelector("#showTempInF");
let toCel_span = document.querySelector("#showTempInC_span");
let toFar_span = document.querySelector("#showTempInF_span");
let currentDate = new Date();
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

    let currentTemperature = Math.round(response.data.main.temp);
    document.querySelector('#temperature').innerHTML = currentTemperature;
    document.querySelector("#displayCityName").innerHTML = response.data.name;
    // document.querySelector("#precipitacion").innerHTML = ` Precipitacion: 0%${response.data.main.humidity}`;
    document.querySelector("#humidity").innerHTML = ` Humidity: ${response.data.main.humidity}%`;
    document.querySelector("#wind").innerHTML = ` Wind: ${Math.round(response.data.wind.speed)} km/h`;
    document.querySelector("#description").innerHTML = `${response.data.weather[0].main}`;
}

function getCityLiveData(city) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showTemperature).catch((error) => {
        alert("City Not Found");
    });
}


function celsius_to_far(temp_in_cel) {
    return Math.round(temp_in_cel * (9 / 5) + 32);
}

function far_to_celsius(temp_in_far) {
    return Math.round((temp_in_far - 32) * (5 / 9));
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

document.querySelector("#date_time").innerHTML = `${
  weekdays[currentDate.getDay()]
} ${currentDate.getHours()}:${
  currentDate.getMinutes() < 10 ? "0" : ""
}${currentDate.getMinutes()}`;

document.querySelector("#searchCity").addEventListener("submit", function(e) {
    e.preventDefault();
    city = document.querySelector("#city").value;
    getCityLiveData(city);

});


toFar.addEventListener("click", function(e) {
    e.preventDefault();
    temp.innerHTML = celsius_to_far(temp.textContent);
    if (toCel.classList.contains("hide")) {
        toCel.classList.remove("hide");
        toCel_span.classList.add("hide");
    }

    this.classList.add("hide");
    toFar_span.classList.remove("hide");
});

toCel.addEventListener("click", function(e) {
    e.preventDefault();
    temp.innerHTML = far_to_celsius(temp.textContent);
    if (toFar.classList.contains("hide")) {
        toFar.classList.remove("hide");
        toFar_span.classList.add("hide");
    }
    this.classList.add("hide");
    toCel_span.classList.remove("hide");
});