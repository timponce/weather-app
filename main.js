let body = document.querySelector("body");
let unitsToggle = document.querySelector("#units-toggle");
let themeToggle = document.querySelector("#theme-toggle");
let searchBtn = document.querySelector("#location-search");
let input = document.querySelector("#location-input");
let results = document.querySelector("#results");

//Units toggle
unitsToggle.addEventListener("click", (e) => {
  unitsToggle.classList.toggle("farenheit");
  unitsToggle.classList.toggle("celsius");
  setLocation();
});

//Dark mode toggle
themeToggle.addEventListener("click", (e) => {
  body.classList.toggle("other-theme");
  themeToggle.classList.toggle("other-theme");
});

//Event listener for clicking search button
searchBtn.addEventListener("click", (e) => {
  setLocation();
});

//Event listener for pressing enter in input field
input.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    setLocation();
  }
});

//Invoke API call of user inputted location
function setLocation() {
  if (input.value) {
    getWeather(input.value);
  }
}

//API call to obtain weather data
async function getWeather(location) {
  try {
    let weatherFromAPI = await fetch(
      "http://api.openweathermap.org/data/2.5/weather?q=" +
        location +
        "&appid=e8a5ffb75f17d40b870bc26f00d0ca18"
    );
    let raw = await weatherFromAPI.json();
    let weather = {
      name: raw.name,
      country: raw.sys.country,
      tempK: raw.main.temp,
      tempC: kelvinToCelsius(raw.main.temp),
      tempF: kelvinToFarenheit(raw.main.temp),
      conditions: raw.weather[0].description,
    };
    displayWeather(weather);
  } catch (error) {
    console.log(error);
    if (document.querySelector("#results-list")) {
      document.querySelector("#results-list").remove();
    }
    let list = document.createElement("ul");
    list.id = "results-list";
    list.textContent = "Location not found.";
    results.appendChild(list);
  }
}

function displayWeather(weather) {
  if (document.querySelector("#results-list")) {
    document.querySelector("#results-list").remove();
  }

  let list = document.createElement("ul");
  list.id = "results-list";
  let name = document.createElement("li");
  name.textContent = weather.name + ", " + weather.country;
  let temp = document.createElement("li");
  unitsToggle.classList.contains("farenheit")
    ? (temp.textContent = weather.tempF + "˚F")
    : (temp.textContent = weather.tempC + "˚C");
  let conditions = document.createElement("li");
  conditions.textContent = weather.conditions;

  list.appendChild(name);
  list.appendChild(temp);
  list.appendChild(conditions);
  results.appendChild(list);
}

function kelvinToCelsius(temp) {
  let tempC = temp - 273.15;
  return Math.round(tempC);
}

function kelvinToFarenheit(temp) {
  let tempF = (temp - 273.15) * (9 / 5) + 32;
  return Math.round(tempF);
}
