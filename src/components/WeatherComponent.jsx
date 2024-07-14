import React, { useState } from 'react';
import axios from 'axios';

const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState('');

  const fetchWeatherData = async () => {
    const options = {
      method: 'GET',
      url: 'https://weatherapi-com.p.rapidapi.com/current.json',
      params: { q: location },
      headers: {
        'x-rapidapi-key': '94600af06emsh29b6c6feba5c10dp10fac4jsne3639eabd1d0',
        'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      setWeatherData(response.data);
      setError(null);
    } catch (error) {
      setError(error);
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    setLocation(event.target.value);
  };

  const handleButtonClick = () => {
    fetchWeatherData();
  };

  return (
    <div>
      <input
        type="text"
        value={location}
        onChange={handleInputChange}
        placeholder="Enter location"
      />
      <button onClick={handleButtonClick}>Get Weather</button>
      
      {error && <p>Error: {error.message}</p>}
      {weatherData ? (
        <div>
          <h1>Weather Data</h1>
          <p>Location: {weatherData.location.name}</p>
          <p>Temperature: {weatherData.current.temp_c}°C</p>
          <p>Condition: {weatherData.current.condition.text}</p>
        </div>
      ) : (
        <p>Enter a location and click 'Get Weather' to see the current weather.</p>
      )}
    </div>
  );
};

export default WeatherComponent;
