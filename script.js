document.addEventListener('DOMContentLoaded', () => {
    const weatherElementLine1 = document.getElementById('weather-line1');
    const weatherElementLine2 = document.getElementById('weather-line2');
    const weatherElementLine3 = document.getElementById('weather-line3');
    const locationElement = document.getElementById('location-info');
    const mapElement = document.getElementById('map');
    const getLocationButton = document.getElementById('get-location-button');
    const backButton = document.getElementById('back-button');
    const page1 = document.getElementById('page1');
    const page2 = document.getElementById('page2');
    let map;
    let marker;

    function showLoading(message) {
        weatherElementLine1.innerHTML = `<div class="loading">${message}</div>`;
        weatherElementLine2.innerHTML = '';
        weatherElementLine3.innerHTML = '';
    }

    function showError(message) {
        weatherElementLine1.innerHTML = `<div class="error">${message}</div>`;
        weatherElementLine2.innerHTML = '';
        weatherElementLine3.innerHTML = '';
    }

    function initializeMap(latitude, longitude) {
        const location = { lat: latitude, lng: longitude };
        if (!map) {
            map = new google.maps.Map(mapElement, {
                center: location,
                zoom: 15,
            });
            marker = new google.maps.Marker({
                position: location,
                map: map,
            });
        } else {
            map.setCenter(location);
            marker.setPosition(location);
        }
    }

    function fetchWeather(latitude, longitude) {
        const apiKey = '51f9a4916778c644290e9754f66ec7a0';
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    weatherElementLine1.innerHTML = `
                        <div class="weather-info">Temp: ${data.main.temp}°C</div>
                    `;
                    weatherElementLine2.innerHTML = `
                        <div class="weather-info">Weather: ${data.weather[0].description}</div>
                    `;
                    weatherElementLine3.innerHTML = `
                        <div class="weather-info">Feels Like: ${data.main.feels_like}°C</div>
                        <div class="weather-info">Humidity: ${data.main.humidity}%</div>
                        <div class="weather-info">Pressure: ${data.main.pressure} hPa</div>
                        <div class="weather-info">Wind Speed: ${data.wind.speed} m/s</div>
                        <div class="weather-info">Wind Dir: ${data.wind.deg}°</div>
                    `;
                } else {
                    showError('Failed to retrieve weather data.');
                }
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                showError('Error fetching weather data.');
            });
    }

    function getLocation() {
        if (navigator.geolocation) {
            showLoading('Fetching location...');
            navigator.geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    locationElement.innerHTML = `Latitude: ${latitude}, Longitude: ${longitude}`;
                    initializeMap(latitude, longitude);
                    fetchWeather(latitude, longitude);
                    showPage2();
                },
                error => {
                    showError('Failed to get location.');
                }
            );
        } else {
            showError('Geolocation is not supported by this browser.');
        }
    }

    function showPage1() {
        page1.style.display = 'block';
        page2.style.display = 'none';
    }

    function showPage2() {
        page1.style.display = 'none';
        page2.style.display = 'block';
    }

    getLocationButton.addEventListener('click', () => {
        getLocation();
    });

    backButton.addEventListener('click', () => {
        showPage1();
    });

    // Automatically get location on load
    getLocation();
});
