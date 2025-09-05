import { apiKey, coordinates } from "./constants";

export function getWeatherData() {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&units=imperial&appid=${apiKey}`
  ).then((res) => {
    return res.ok
      ? res.json()
      : Promise.reject(`Error from weather API: ${res.status}`);
  });
}

export function parseWeatherData(data) {
  const parsedData = {};
  parsedData.city = data.name;
  parsedData.temperature = {};
  parsedData.temperature.F = Math.round(data.main.temp);
  parsedData.temperature.C = Math.round(((data.main.temp - 32) * 5) / 9);
  return parsedData;
}

export function getWeatherCondition(temperature) {
  if (temperature >= 86) {
    return "hot";
  } else if (temperature >= 66 && temperature < 86) {
    return "warm";
  } else {
    return "cold";
  }
}
