const API_KEY = "eb7c640f95ecbd859f32dccf858906ee";

const fetchDataBtn = document.getElementById("fetch-data-btn");
const hideContainer = document.getElementById("first-container");
const handleError = document.querySelector(".error");

fetchDataBtn.addEventListener("click", async () => {
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        // console.log("***", data);
        // Display the weather data here
        displayWeatherData(data);
        hideContainer.style.display = "none";
      } catch (error) {
        console.error(error);
        handleError.innerHTML = `<h3> User denise the location access</h3>`
      }
    },
    (error) => {
      console.error(error);
    }
  );
});

// To get wind Direction
function getDirection(degree) {
    if (
      (degree >= 348.75 && degree <= 360) ||
      (degree >= 0 && degree < 11.25)
    ) {
      return "North";
    } else if (degree >= 11.25 && degree < 33.75) {
      return "North-Northeast";
    } else if (degree >= 33.75 && degree < 56.25) {
      return "North East";
    } else if (degree >= 56.25 && degree < 78.75) {
      return "East-North East";
    } else if (degree >= 78.75 && degree < 101.25) {
      return "East";
    } else if (degree >= 101.25 && degree < 123.75) {
      return "East-South East";
    } else if (degree >= 123.75 && degree < 146.25) {
      return "South East";
    } else if (degree >= 146.25 && degree < 168.75) {
      return "South-South East";
    } else if (degree >= 168.75 && degree < 191.25) {
      return "South";
    } else if (degree >= 191.25 && degree < 213.75) {
      return "South-South West";
    } else if (degree >= 213.75 && degree < 236.25) {
      return "South West";
    } else if (degree >= 236.25 && degree < 258.75) {
      return "West-South West";
    } else if (degree >= 258.75 && degree < 281.25) {
      return "West";
    } else if (degree >= 281.25 && degree < 303.75) {
      return "West-North West";
    } else if (degree >= 303.75 && degree < 326.25) {
      return "North West";
    } else if (degree >= 326.25 && degree < 348.75) {
      return "North-North West";
    } else {
      return "Invalid degree input";
    }
  }

function displayWeatherData(data) {
  const kelvin = data.main.temp;
  const kelvinToCelsius = Math.floor(Math.abs(kelvin - 273.15));
  const description = data.weather[0].description;
  const cityName = data.name;
  const lat = data.coord.lat;
  const lon = data.coord.lon;
  const windSpeed = data.wind.speed;
  const humidity = data.main.humidity;
  const pressure = data.main.pressure;
  const windDirection = data.wind.deg;

  //   console.log(lat, lon, cityName);
// wind direction we get  
  const windDirectionCalculated = getDirection(windDirection);

  const weatherContainer = document.getElementById("weather-container");
  weatherContainer.innerHTML = `
  <div class="main-section">
     <div class="main-container">
     <h2 id="location-header">Welcome To The Weather App</h2>
      <p id="subheading">Here is your current location</p>
    <div class="latlong">
    <p class="details">Lat: ${lat}</p>
    <p class="details">Long: ${lon}</p>
    </div>
    <div class="map">
    <iframe src="https://maps.google.com/maps?q=${lat},${lon}&z=15&output=embed" width="600" height="300" frameborder="0" style="border:0"></iframe>
    </div>
    </div>    
    
    <h2 class="heading-3">Your Weather Data</h2> 
    <div class="footer-container">
    <p class="details">Location: ${cityName}</p>
    <p class="details">Wind Speed: ${windSpeed}kmph</p>
    <p class="details">Humidity: ${humidity}</p>
    <p class="details">Pressure: ${pressure}atm</p>
    <p class="details">Wind Direction: ${windDirectionCalculated}</p>
    <p class="details">Description: ${description}</p>
    <p class="details">Feels like: ${kelvinToCelsius}°</p>
    </div>
    </div>
  `;
}