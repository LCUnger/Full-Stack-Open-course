import type { CountryData } from "../services/countries"
import { useEffect, useState } from "react";

const CountryInformation = ({countryDataPromise}: {countryDataPromise: Promise<CountryData>}) => {

    const [countryData, setCountryData] = useState<CountryData | null>(null);

    useEffect(() => {
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
        </div>
    )
}

export default CountryInformation