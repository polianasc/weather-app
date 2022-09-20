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

function formatDayForecast(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
          <div class="col-2">
            <div class="weather-forecast-date">${formatDayForecast(
              forecastDay.dt
            )}</div>
            <img
              src="https://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              alt=""
              width="30"
            />
    
            <div class="weather-forecast-temperature">
              <span class="weather-forecast-temperature-max"> ${Math.round(
                forecastDay.temp.max
              )}° </span>
              <span class="weather-forecast-temperature-min"> ${Math.round(
                forecastDay.temp.min
              )}° </span>
            </div>
          </div>
`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);

  let apiKey = `445905dadb3d2b0c6f1b916c9d0e3860`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#temperature").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector("#city-result").innerHTML = response.data.name;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#feels-like").innerHTML = `${Math.round(
    response.data.main.feels_like
  )}°`;
  document.querySelector("#max-temp").innerHTML = `${Math.round(
    response.data.main.temp_max
  )}°`;
  document.querySelector("#min-temp").innerHTML = `${Math.round(
    response.data.main.temp_min
  )}°|`;
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
  console.log(response.data);
  getForecast(response.data.coord);
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

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

// Call to action - gobal variables

let searchForm = document.querySelector("#search-city");
searchForm.addEventListener("submit", submitCity);

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentLocation);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

// Search action

searchCity("Lisbon");
