const button = document.getElementById("getWeather");
const result = document.getElementById("result");

button.addEventListener('click', async () => {
    const city = document.getElementById("city").value.trim();
    
    // Coordinate of the city
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;
    const geoRes = await fetch(geoUrl);
    const geoData = await geoRes.json();

    console.log(geoData);

    if(!geoData.results || geoData.results.length === 0) {
        result.textContent = "City not found";
        return; 
    }

    const { latitude, longitude, name } = geoData.results[0];
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

    const weatherRes = await fetch(weatherUrl);
    const weatherData = await weatherRes.json();

    const weather = weatherData.current_weather;

    result.innerHTML = `
    <h2>${name}</h2>
    <p>Temperature: ${weather.temperature}°C</p>
    <p>Wind speed: ${weather.windspeed} km</p>
    
    `;
});