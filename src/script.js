function formattedDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hour}:${minutes}`;
}

function updateWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#searched-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let icon = document.querySelector("#icon");

  icon.innerHTML = `<img src = "${response.data.condition.icon_url}" class= "weather-icon" alt="weather-icon"/>`;
  temperatureElement.innerHTML = Math.round(temperature);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  timeElement.innerHTML = formattedDate(date);

  getForecast(response.data.city);
}

function searchCity(city) {
  let apiKey = "994e00cta309fb5a690abfo72b4aafe6";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sunday", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "994e00cta309fb5a690abfo72b4aafe6";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&unit=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast-display");

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
  <div class="forecast-day">
                    <div class="forecast-date">${formatDay(day.time)}</div>
                    <div ><img src ="${
                      day.condition.icon_url
                    }"class="forecast-icon"/>
                    </div>
                    <div class="forecast-temps">
                        <div class="forecast-temp-each"><strong>${Math.round(
                          day.temperature.maximum
                        )}°</strong></div>
                        <div class="forecast-temp-each"> ${Math.round(
                          day.temperature.minimum
                        )}°</div>
                    </div>
                </div>
                `;
    }
  });
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Nottingham");
displayForecast();
