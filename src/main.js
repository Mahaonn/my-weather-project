function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  let descriptionElement = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#current-humidity");
  let windElement = document.querySelector("#wind-speed");
  let windSpeed = response.data.wind.speed;
  let iconElement = document.querySelector("#weather-icon");

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = temperature;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(windSpeed * 10) / 10;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-data-icon" />`;

  getForecast(response.data.city);
}

function formatDate(date) {
  let numberOfMonth = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let sec = date.getSeconds();
  let meridiem = document.querySelector("#meridiem");

  if (hours > 12) {
    meridiem.innerHTML = "PM";
  } else {
    meridiem.innerHTML = "AM";
  }

  if (hours > 12) {
    hours = hours - 12;
  } else {
    hours = hours;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (sec < 10) {
    sec = `0${sec}`;
  }

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Nov",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[date.getMonth()];
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];

  let currentHoursElement = document.querySelector("#hours");
  currentHoursElement.innerHTML = hours;
  let currentMinElement = document.querySelector("#min");
  currentMinElement.innerHTML = minutes;
  let currentSecElement = document.querySelector("#sec");
  currentSecElement.innerHTML = sec;
  return `${day}, ${numberOfMonth} ${month}`;
}

function searchCity(city) {
  let apiKey = "7b358bb45a2c3obdef533te70adb056a";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  searchCity(searchInputElement.value);
  searchInputElement.value = "";
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "fbef01f4et1b02o0d25c27210a43ef3f";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function updateTime() {
  let currentTimeElement = document.querySelector("#current-time");
  let currentDate = new Date();
  currentTimeElement.innerHTML = formatDate(currentDate);
}

setInterval(updateTime, 1000);

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index > 0 && index < 7)
      forecastHtml =
        forecastHtml +
        `
            <div class="weather-forecast-day">
              <img
                src="${day.condition.icon_url}"
                class="weather-forecast-icon"
              width: 100px;/>
              <div class="weather-forecast-temperatures">
                <div class="weather-forecast-temperature">
                  <strong>${Math.round(
                    day.temperature.maximum
                  )}&deg</strong><span>/${Math.round(
          day.temperature.minimum
        )}&deg</span>
                </div>
              </div>
              <div class="weather-forecast-date">${formatDay(day.time)}</div>
            </div>
`;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearchSubmit);

searchCity("Kyiv");
getForecast("Kyiv");
