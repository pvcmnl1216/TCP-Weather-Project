const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// OpenWeatherMap API key
const apiKey = '26ddc7b8ef43e3c2add002e0e2210124';

app.get('/weather/:city', async (req, res) => {
  try {
    const city = req.params.city;
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await axios.get(apiUrl);
    const weatherData = response.data;

    // You can customize the response format as needed
    const formattedResponse = {
      temperature: weatherData.main.temp,
      description: weatherData.weather[0].description,
    };

    res.json(formattedResponse);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving weather data');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:3000`);
});
