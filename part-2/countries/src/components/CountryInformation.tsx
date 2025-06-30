import type { CountryData } from "../services/countries"
import { useEffect, useState } from "react";
import weatherService from "../services/weather";
import type { WeatherData } from "../services/weather";

const WeatherInfo = ({ countryCapital, weatherData }: { countryCapital: string, weatherData: WeatherData | null }) => {
    if (!countryCapital || !weatherData) {
        return <div>Loading weather information...</div>;
    }

    return (
        <div>
            <h3>Weather in {countryCapital}</h3>
            <p>Temperature: {weatherData.current.temp}°C</p>
            <img
                src={`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`}
                alt={weatherData.current.weather[0].description}
            />
            <p>
                Wind: {weatherData.current.wind_speed} m/s
                <span
                    style={{
                        display: "inline-block",
                        marginLeft: "8px",
                        transform: `rotate(${weatherData.current.wind_deg}deg)`,
                        transition: "transform 0.3s ease",
                    }}
                >➤</span>
            </p>
        </div>
    );
};


const CountryInformation = ({countryDataPromise}: {countryDataPromise: Promise<CountryData>}) => {

    const [countryData, setCountryData] = useState<CountryData | null>(null);
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

    useEffect(() => { // Effect to get weatherData
        if (countryData) {
            weatherService.getWeather(countryData.capitalInfo.latlng).then(data => setWeatherData(data))
            .catch(error => {
                console.error("Failed to fetch weather data:", error);
            });
        }
    }, [countryData]);

    useEffect(() => { // Effect to get country data
        countryDataPromise.then(data => setCountryData(data)).catch(error => {
            console.error("Failed to fetch country data:", error);
        });
    }, [countryDataPromise]);

    if (!countryData) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <h2>{countryData.name.common}</h2>
            <div>
                <p>Capital: {countryData.capital}</p>
                <p>Area: {countryData.area}</p>
            </div>
            <div>
                <h3>Languages</h3>
                <ul>
                    {Object.entries(countryData.languages).map(([key, language]) => (
                        <li key={key}>{language}</li>
                    ))}
                </ul>
            </div>
            <div>
                <img src={countryData.flags.svg} alt={countryData.flags.alt} style={{ width: "300px", height: "auto" }}/>
            </div>
            <div>
                <WeatherInfo countryCapital={countryData.capital[0]} weatherData={weatherData}/>
            </div>
        </div>
    )
}

export default CountryInformation