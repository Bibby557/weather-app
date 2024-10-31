//Date & Time
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

let dateTime = document.querySelector("#current-time");
let currentDate = new Date();
dateTime.innerHTML = formattedDate(currentDate);

//Search & data
function searchData(city) {
  let apiKey = "994e00cta309fb5a690abfo72b4aafe6";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(currentWeather);
}
function currentWeather(response) {
  let searchedCity = response.data.city;
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = searchedCity;

  let temp = Math.round(response.data.temperature.current);
  let currentTemp = document.querySelector(".temperature");
  currentTemp.innerHTML = `${temp}°C`;
}

function cityLookUp(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#enter-city");
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = cityInput.value;
  searchData(cityInput.value);
}

let searchBox = document.querySelector("#search-city");
searchBox.addEventListener("submit", cityLookUp);
