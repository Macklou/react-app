import React, { useState } from "react";
import "./Weather.css";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCurrentWeather = async () => {};

  const fetchForecast = async (city) => {
    setIsLoading(true);
    setError("");

    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Forecast data for the city not found.");
      }
      const data = await response.json();
      setForecast(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchData = async (e) => {
    e.preventDefault();
    await fetchCurrentWeather(city);
    await fetchForecast(city);
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

      {}
      {weather && (
        <div>
          <h1>Weather in {weather.name}</h1>
          {}
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
                  alt="Weather icon"
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
