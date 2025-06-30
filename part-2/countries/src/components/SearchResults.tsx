import CountryInformation from './CountryInformation';
import countriesService from '../services/countries';

const SearchResults = ({ queryResults, showCountry }: { queryResults: string[], showCountry: (countryName: string) => void }) => {
  if (queryResults.length === 1) {
    // Case 1: Single match found
    return (
      <CountryInformation countryDataPromise={countriesService.getCountry(queryResults[0])}/>
    );
  }

  if (queryResults.length > 1 && queryResults.length <= 10) {
    // Case 2: Multiple matches (2–10)
    return (
      <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
        {queryResults.map((country) => (
          <li key={country}>
            {country}
            <button onClick={() => showCountry(country)}>show</button>
          </li>
        ))}
      </ul>
    );
  }

  if (queryResults.length > 10) {
    // Case 3: Too many matches
    return <p>Too many matches, please refine your search.</p>;
  }

  // Case 4: No matches
  return <p>No matches found.</p>;
};

export default SearchResults;