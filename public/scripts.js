document.getElementById('get-weather-btn').addEventListener('click', async () => {
    const city = document.getElementById('city-input').value;

    try {
        const response = await fetch(`/weather/${city}`);
        const data = await response.json();

        // Extract the specific data to display
        const weatherDescription = data.weather[0].description;
        const temperature = data.main.temp;
        const humidity = data.main.humidity;

        // Construct the HTML to display
        const html = `
            <h3>Weather in ${city}</h3>
            <p><strong>Description:</strong> ${weatherDescription}</p>
            <p><strong>Temperature:</strong> ${temperature} K</p>
            <p><strong>Humidity:</strong> ${humidity}%</p>
        `;

        // Update the weather-result div with the constructed HTML
        document.getElementById('weather-result').innerHTML = html;
    } catch (err) {
        document.getElementById('weather-result').innerHTML = '<p style="color: red;">Please input a valid value for the field: City.';
    }
});

async function loadFavorites() {
    try {
        const response = await fetch('/favorites');
        const favorites = await response.json();

        const favoritesList = document.getElementById('favorites-list');
        favoritesList.innerHTML = '';

        favorites.forEach(favorite => {
            const li = document.createElement('li');
            li.innerText = favorite.city;
            li.addEventListener('click', async () => {
                await fetch(`/favorites/${favorite.city}`, { method: 'DELETE' });
                loadFavorites();
            });
            favoritesList.appendChild(li);
        });
    } catch (err) {
        console.error('Error loading favorites', err);
    }
}

document.getElementById('get-weather-btn').addEventListener('click', async () => {
    const city = document.getElementById('city-input').value;

    try {
        const response = await fetch(`/weather/${city}`);
        const data = await response.json();

        // Extract the specific data to add to favorites
        const weatherDescription = data.weather[0].description;
        const temperature = data.main.temp;
        const humidity = data.main.humidity;

        // Convert temperature from Kelvin to Celsius
        const temperatureC = (temperatureK - 273.15).toFixed(1); 
        
        // Prepare data to send to the server
        const payload = {
            city,
            weather: {
                description: weatherDescription,
                temperature,
                humidity
            }
        };

        // POST request to add city with weather details to favorites
        await fetch('/favorites', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        // Reload favorites list
        loadFavorites();
    } catch (err) {
        console.error('Error adding favorite', err);
    }
});

loadFavorites();
