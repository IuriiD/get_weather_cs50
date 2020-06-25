const axios = require('axios');

async function get_weather(location) {
  try {
    console.log(process.env.OPENWEATHERMAP_API_KEY);
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=fbed55f709064df399c2b42e64adcc99`;

    const weather = await axios.get(url);

    if (weather.status !== 200) {
      return {status: 500, data: `Failed to get the forecast for ${location}. Please try again later`};
    }

    const weather_data = weather.data;
    console.log(`weather_data=${weather_data}`);

    const response = `Currently in ${weather_data.name} (latitude: ${weather_data.coord.lat}, longitude: ${weather_data.coord.lon}) the weather is the following: temperature - ${weather_data.main.temp}F (feels like ${weather_data.main.feels_like}F), humidity - ${weather_data.main.humidity}%, ${weather_data.weather[0].description}`;
    console.log(`response=${response}`);
    return {status: 200, data: response};

  } catch (error) {
    return {status: 500, data: error};
  }
}

module.exports = get_weather;