import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import countriesService from './services/countries';
import buildSearchIndex from './services/buildSearchIndex';
import type { Country, SearchIndex } from './services/buildSearchIndex';

/* 
Read me
In This project I've opted for te following structure, I'm not sure if its the best for this application but I'll try to argue my reasons:
1.  I've fetched all the country info and extracted just the name and official name and put them in a search index to always reference to common name of the country.
    You could add alt spellings or translation into this as well, but based on the simple nature of the search engine this resulted in weird behavior sometimes.

2.  The user writes in the SearchBar, based on the created search index a list of matches roles out. I added support for the 'sudan' cases by first looking for perfect matches and if not found for partial matches.
3.  These are handled as instructed; if this list is larger than 1 and smaller than 10 show the list of results and a button attached which will directly bring you to the information page of the corresponding country
    In case of a single match, the information page is loaded automatically.

4.  Here come the design choices I'm not quite sure of: So I chose to fetch the countries data from the api just when the country info should be loaded.
    This as to not create to not create to many api calls, or store more data than necessary. The latter is a habit I adopted from computational science in python though in this project it don't think it would matter much.
    I adopted the same method for the weather information, in this case it is smart because for the weather api you can only fetch one city at a time, and you'd need to refresh the current weather every 15 minutes
    This would result in a lot of API calls, and since this API will start costing money after 1000 calls. I thought this'd be the best way of handling it.
    Looking back I think it would've been best to store the countries data ahead of time and just call the weather api on render, but I don't feel like fixing it since I won't learn much from it.
*/


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