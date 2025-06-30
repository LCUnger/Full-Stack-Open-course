import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import countriesService from './services/countries';
import buildSearchIndex from './services/buildSearchIndex';
import type { Country, SearchIndex } from './services/buildSearchIndex';

function App() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchIndex, setSearchIndex] = useState<SearchIndex>({});
  const [queryResults, setQueryResults] = useState<string[]>([]);

  

  useEffect(() => {// Build search index on first render
    countriesService
      .getAllCountries()
      .then((rawData) => {
        const countries: Country[] = rawData.map((country: any) => ({
          commonName: country.name.common,
          officialName: country.name.official,
          // alternativeSpellings: country.altSpellings || [],
        }));

        const index = buildSearchIndex(countries);
        setSearchIndex(index);
      })
      .catch((error) => {
        console.log('Error fetching or processing countries:', error);
      });
  }, []);

  useEffect(() => { //Manager search query
    const filterResults = (query: string, index: SearchIndex) => {
      if (!query) return [];

      const normalizedQuery = query.toLowerCase();

      // Case 1: Check for exact matches
      const exactMatch = Object.keys(index).find((key) => key === normalizedQuery);
      if (exactMatch) {
        return [index[exactMatch]]; // Return the official name for the exact match
      }

      // Case 2: Fallback to partial matches
      const partialMatches = Object.keys(index)
        .filter((key) => key.includes(normalizedQuery)) // Find keys that include the query
        .map((key) => index[key]); // Get values of the matching keys

      return Array.from(new Set(partialMatches)); // Return unique results
    };

    setQueryResults(filterResults(searchQuery, searchIndex));
  }, [searchQuery, searchIndex]);

  const showCountry = (countryName: string) => {
    setQueryResults([countryName])
  }



  return (
    <>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <SearchResults queryResults={queryResults} showCountry={showCountry}/>
    </>
  );
}

export default App;
