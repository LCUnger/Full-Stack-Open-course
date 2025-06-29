import CountryInformation from './CountryInformation';
import countriesService from '../services/countries';

const SearchResults = ({ queryResults }: { queryResults: string[] }) => {
  if (queryResults.length === 1) {
    // Case 1: Single match found
    return (
      <CountryInformation
        countryDataPromise={countriesService.getCountry(queryResults[0])}
      />
    );
  }

  if (queryResults.length > 1 && queryResults.length <= 10) {
    // Case 2: Multiple matches (2–10)
    return (
      <ul>
        {queryResults.map((country) => (
          <li key={country}>{country}</li>
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