import React, { useState } from "react";
import "./Weather.css";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const fetchWeather = async (e) => {
    e.preventDefault();
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    const fetchData = async () => {
      await fetchWeather(city);
      await fetchForecast(city);
    };
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Forecast data for the city not found.");
      }
      const data = await response.json();
      setForecast(data);
    } catch (error) {
      setError(error.message);
      setForecast(null);
    } finally {
      setIsLoading(false);
    }
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

      {weather && (
        <div>
          <h1>Weather in {weather.name}</h1>
          <div>
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              alt="Weather icon"
            />
            <p>{weather.weather[0].description}</p>
          </div>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
          <a
            href="https://github.com/MackLou"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit my GitHub
          </a>
        </div>
      )}
    </div>
  );
};
{
  forecast && (
    <div className="forecast-container">
      <h2>5-day Forecast</h2>
      {forecast.list
        .filter((_, index) => index % 8 === 0)
        .map((item, index) => (
          <div key={index} className="forecast-item">
            <h3>{new Date(item.dt_txt).toLocaleDateString()}</h3>
            <img
              src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
              alt="Weather icon"
            />
            <p>{item.weather[0].description}</p>
            <p>Temp: {item.main.temp}°C</p>
          </div>
        ))}
    </div>
  );
}

export default Weather;
