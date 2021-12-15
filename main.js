let tempK,
    tempC,
    tempF;

let body = document.querySelector('body');
let themeToggle = document.querySelector('#theme-toggle');
let searchBtn = document.querySelector('#location-search');
let input = document.querySelector('#location-input');
let results = document.querySelector('#results');

//Dark mode toggle
themeToggle.addEventListener('click', e => {
    body.classList.toggle('other-theme');
    themeToggle.classList.toggle('other-theme');
})

//Event listener for clicking search button
searchBtn.addEventListener('click', e => {
    setLocation();
})

//Event listener for pressing enter in input field
input.addEventListener('keyup', e => {
    if (e.keyCode === 13) {
        setLocation();
    }
})

//Invoke API call of user inputted location
function setLocation() {
    if (input.value) {
        getWeather(input.value);
    }
}

//API call to obtain weather data
async function getWeather(location) {
    try {
        let weather = await fetch('http://api.openweathermap.org/data/2.5/weather?q='+location+'&appid=e8a5ffb75f17d40b870bc26f00d0ca18');
        let x = await weather.json();
        console.log(x);
        tempK = x.main.temp;
        displayWeather(x);
    } catch(error) {
        console.log(error);
        results.textContent = "Location not found.";
    }
}

function displayWeather(x) {


    let list = document.createElement('ul');
    list.id = 'results-list';
    let name = document.createElement('li');
    name.textContent = x.name;
    let temp = document.createElement('li');
    temp.textContent = kelvinToFarenheit(x.main.temp);
    list.appendChild(name);
    list.appendChild(temp);

    results.appendChild(list);
}

function kelvinToCelsius() {
    tempC = tempK - 273.15;
    return Math.round(tempC);
}

function kelvinToFarenheit() {
    tempF = (tempK - 273.15) * (9/5) + 32;
    return Math.round(tempF);
}