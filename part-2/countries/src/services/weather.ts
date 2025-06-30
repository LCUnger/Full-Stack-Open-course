import axios from "axios";


const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY

interface WeatherCondition {
    id: number; // Weather condition ID
    main: string; // Group of weather parameters (e.g., Rain, Snow, Clouds)
    description: string; // Description of the weather condition
    icon: string; // Weather icon ID
  }
  
interface CurrentWeather {
    dt: number; // Current time (Unix timestamp)
    sunrise: number; // Sunrise time (Unix timestamp)
    sunset: number; // Sunset time (Unix timestamp)
    temp: number; // Temperature in Kelvin (or Celsius if units=metric)
    feels_like: number; // Feels-like temperature
    pressure: number; // Atmospheric pressure (hPa)
    humidity: number; // Humidity percentage
    dew_point: number; // Dew point temperature
    uvi: number; // UV index
    clouds: number; // Cloudiness percentage
    visibility: number; // Visibility in meters
    wind_speed: number; // Wind speed in meters/second
    wind_deg: number; // Wind direction in degrees
    wind_gust?: number; // Wind gust speed (optional)
    weather: WeatherCondition[]; // Array of weather conditions
  }
  
export interface WeatherData {
    lat: number; // Latitude
    lon: number; // Longitude
    timezone: string; // Timezone name
    timezone_offset: number; // Timezone offset in seconds
    current: CurrentWeather; // Current weather data
  }

if (!apiKey) {
    console.error("API Key is missing! Make sure VITE_OPENWEATHER_API_KEY is set in your .env file.");
}

const getWeather = (coordinates: [number, number]) => {
    const [lat, lon] = coordinates;
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&units=metric&appid=${apiKey}`;
    return axios.get<WeatherData>(url).then(response => response.data);
}

export default {getWeather}