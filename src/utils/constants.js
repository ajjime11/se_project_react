import sunnyDay from "../assets/sunny-day.png";
import sunnyNight from "../assets/sunny-night.png";
import cloudyDay from "../assets/cloudy-day.png";
import cloudyNight from "../assets/cloudy-night.png";
import rainyDay from "../assets/rainy-day.png";
import rainyNight from "../assets/rainy-night.png";
import stormyDay from "../assets/stormy-day.png";
import stormyNight from "../assets/stormy-night.png";
import snowyDay from "../assets/snowy-day.png";
import snowyNight from "../assets/snowy-night.png";
import foggyDay from "../assets/foggy-day.png";
import foggyNight from "../assets/foggy-night.png";

export const weatherConditions = [
  { type: "Clear", isDay: true, image: sunnyDay },
  { type: "Clear", isDay: false, image: sunnyNight },
  { type: "Clouds", isDay: true, image: cloudyDay },
  { type: "Clouds", isDay: false, image: cloudyNight },
  { type: "Rain", isDay: true, image: rainyDay },
  { type: "Rain", isDay: false, image: rainyNight },
  { type: "Storm", isDay: true, image: stormyDay },
  { type: "Storm", isDay: false, image: stormyNight },
  { type: "Snow", isDay: true, image: snowyDay },
  { type: "Snow", isDay: false, image: snowyNight },
  { type: "Mist", isDay: true, image: foggyDay },
  { type: "Mist", isDay: false, image: foggyNight },
];

export const coordinates = { lat: "33.408126", lon: "-111.901119" };
export const apiKey = "733305064d06bb31f51d2aeef607f3ae";
