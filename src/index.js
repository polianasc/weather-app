// Day and Hour

function formateDate(timestamp) {
  let now = new Date();
  let weekDay = document.querySelector("#day-time");
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let day = days[now.getDay()];

  return `${day} ${hours}:${minutes}`;
}

// City Heading e Searching City using API

function displayWeather(response) {
  document.querySelector("#city-result").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#feels-like").innerHTML = `${Math.round(
    response.data.main.feels_like
  )}°C`;
  document.querySelector("#max-temp").innerHTML = `${Math.round(
    response.data.main.temp_max
  )}°C`;
  document.querySelector("#min-temp").innerHTML = `${Math.round(
    response.data.main.temp_min
  )}°C /`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}%`;
  document.querySelector("#day-time").innerHTML = formateDate(
    response.data.dt * 1000
  );
  document.querySelector("#wind-speed").innerHTML = `${Math.round(
    response.data.wind.speed
  )} km/h`;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].descripition);
}

function searchCity(city) {
  let apiKey = "f5029b784306910c19746e40c14d6cd3";
  let apiEndponit = "https://api.openweathermap.org/data/2.5/weather?";
  let units = "metric";
  let apiUrl = `${apiEndponit}q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function submitCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-input").value;
  searchCity(city);
}

// Current geolocation

function searchLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "f5029b784306910c19746e40c14d6cd3";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiEndpoint}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

// Call to action

let searchForm = document.querySelector("#search-city");
searchForm.addEventListener("submit", submitCity);

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentLocation);

searchCity("Lisbon");
