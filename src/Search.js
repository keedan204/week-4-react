import { useState } from "react";
import "./Search.css";
import axios from "axios";

export default function Search() {
  let [city, setCity] = useState();
  let [loaded, setLoaded] = useState(false);
  let [weather, setWeather] = useState({});
  function displayWeatherData(response) {
    setLoaded(true);
    setWeather({
      temperature: response.data.temperature.current,
      humidity: response.data.temperature.humidity,
      wind: response.data.wind.speed,
      description: response.data.condition.description,
      icon: response.data.condition.icon_url,
    });
  }
  function getApi(event) {
    event.preventDefault();

    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=71c9o8ef0370bd39a326b41301fb04bt`;
    axios.get(apiUrl).then(displayWeatherData);
  }

  function getCity(event) {
    setCity(event.target.value);
  }
  let form = (
    <form onSubmit={getApi}>
      <input type="search" placeholder="Type a city..." onChange={getCity} />
      <input type="submit" value="Search" />
    </form>
  );
  if (loaded) {
    return (
      <div>
        {form}
        <ul>
          <li>Temperature: {Math.round(weather.temperature)}°C</li>
          <li>Description: {weather.description}</li>
          <li>Humidity: {weather.humidity}%</li>
          <li>Wind: {Math.round(weather.wind)}km/h</li>
          <li>
            {" "}
            <img src={weather.icon} alt={weather.description} />
          </li>
        </ul>
      </div>
    );
  } else {
    return form;
  }
}