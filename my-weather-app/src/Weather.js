import React, { useState, useEffect } from "react";

const Weather = () => {
  const [weather, setWeather] = useState(null);

  const fetchWeather = async (lat, lon) => {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();
    setWeather(data);
  };

  useEffect(() => {
    // Use a static location for example (latitude and longitude for New York City)
    fetchWeather(40.7128, -74.006);
  }, []);

  if (!weather) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Weather in {weather.name}</h1>
      <p>Temperature: {weather.main.temp}°C</p>
      <p>Humidity: {weather.main.humidity}%</p>
      <p>Wind Speed: {weather.wind.speed} m/s</p>
    </div>
  );
};

export default Weather;
