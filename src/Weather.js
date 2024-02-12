import React, { useState } from "react";
import "./Weather.css";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCurrentWeather = async (city) => {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Current weather data for the city not found.");
      }
      const data = await response.json();
      setWeather(data);
    } catch (fetchError) {
      setError(fetchError.message);
      setWeather(null);
    }
  };

  const fetchForecast = async (city) => {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Forecast data for the city not found.");
      }
      const data = await response.json();
      setForecast(data);
    } catch (forecastError) {
      setError(forecastError.message);
      setForecast(null);
    }
  };

  const fetchData = async (e) => {
    e.preventDefault();
    setError(""); // Clear any existing errors
    setIsLoading(true);

    await fetchCurrentWeather(city);
    await fetchForecast(city);

    setIsLoading(false);
  };

  return (
    <div>
      <form onSubmit={fetchData}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name..."
          required
        />
        <button type="submit">Get Weather</button>
      </form>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {weather && (
        <div>
          <h1>Weather in {weather.name}</h1>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            alt={weather.weather[0].description}
          />
          <p>{weather.weather[0].description}</p>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}

      {forecast && (
        <div className="forecast-container">
          <h2>5-day Forecast</h2>
          {forecast.list
            .filter((_, index) => index % 8 === 0)
            .map((item, index) => (
              <div key={index} className="forecast-item">
                <h3>{new Date(item.dt * 1000).toLocaleDateString()}</h3>
                <img
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                  alt={item.weather[0].description}
                />
                <p>{item.weather[0].description}</p>
                <p>Temp: {Math.round(item.main.temp)}°C</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Weather;
