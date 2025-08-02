const cityInput = document.querySelector('.city-input');
const searchBtn = document.querySelector('.search-btn');
const weatherInfoSection = document.querySelector('.weather-info');
const notFoundSection = document.querySelector('.not-found');
const tempText = document.querySelector('.temp-text');
const windText = document.querySelector('.wind-text');
const conditionText = document.querySelector('.condition-text');
const humidityText = document.querySelector('.humidity-text');
const searchCitySection = document.querySelector('.search-city');
const countryText = document.querySelector('.country-text');
const weatherClouds = document.querySelector('.weather-clouds');
const dateSec = document.querySelector('.date-sec');

const apikey = '203d45153a42cb5b7b0eba7fcfab48af';

searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city !== '') {
    updateWeatherInfo(city);
    cityInput.value = '';
    cityInput.blur();
  }
});


csityInput.addEventListener('keydown', (e) => {
  const city = cityInput.value.trim();
  if (e.key === 'Enter' && city !== '') {
    updateWeatherInfo(city);
    cityInput.value = '';
    cityInput.blur();
  }
});


async function getFetchData(endpoint, city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/${endpoint}?q=${city}&appid=${apikey}&units=metric`;
  const response = await fetch(apiUrl);
  return response.json();
}


function getWeatherIcon(id) {
  if (id <= 232) return 'thunderstorm.svg';
  if (id <= 321) return 'drizzle.svg';
  if (id <= 531) return 'rain.svg';
  if (id <= 622) return 'snow.svg';
  if (id <= 781) return 'atmosphere.svg';
  if (id === 800) return 'clear.svg';
  return 'clouds.svg';
}


function getDateSec() {
  const date = new Date();
  const options = {
    weekday: 'short',
    day: '2-digit',
    month: 'short'
  };
  return date.toLocaleDateString('en-GB', options);
}


async function updateWeatherInfo(city) {
  const weatherData = await getFetchData('weather', city);

  if (weatherData.cod !== 200) {
    showDisplaySection(notFoundSection);
    return;
  }

  const {
    name: country,
    main: { temp, humidity },
    weather: [{ id, main }],
    wind: { speed }
  } = weatherData;

  countryText.textContent = country;
  tempText.textContent = Math.round(temp) + ' °C';
  conditionText.textContent = main;
  humidityText.textContent = humidity + '%';
  windText.textContent = speed + ' M/s';
  dateSec.textContent = getDateSec();
  weatherClouds.src = `assets/weather/${getWeatherIcon(id)}`;

  await updateForecastsInfo(city);
  showDisplaySection(weatherInfoSection);
}


async function updateForecastsInfo(city) {
  const forecastsData = await getFetchData('forecast', city);
  console.log(forecastsData);
  
}


function showDisplaySection(sectionToShow) {
  [weatherInfoSection, searchCitySection, notFoundSection].forEach((section) => {
    section.style.display = 'none';
  });

  sectionToShow.style.display = 'flex';
}