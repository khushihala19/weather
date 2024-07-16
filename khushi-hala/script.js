const weatherForm = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');
const weatherResults = document.getElementById('weatherResults');

const API_KEY = '217d9466fcece181f108ef7574f237b4'; 
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';



weatherForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const city = cityInput.value.trim();

  
    
    if (city) {

        try {
            const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
            const data = await response.json();

            if (data.cod === 200) {
                const weather = data.weather[0].main;
                const temp = data.main.temp;
                const humidity = data.main.humidity;
                
                weatherResults.innerHTML = `
                    <h3>Weather in ${city}</h3>
                    <p><strong>Weather:</strong> ${weather}</p>
                    <p><strong>Temperature:</strong> ${temp} &deg;C</p>
                    <p><strong>Humidity:</strong> ${humidity}%</p>
                `;
                let icon = document.getElementById("icon");

                let iconurl =
                  "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
            
                icon.src = iconurl;
            } 
            
            else {
                weatherResults.innerHTML = `<p>${data.message}</p>`;
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
            weatherResults.innerHTML = '<p>Failed to fetch weather data. Please try again later.</p>';
        }
    } else {
        weatherResults.innerHTML = '<p>Please enter a city name.</p>';
    }
});
