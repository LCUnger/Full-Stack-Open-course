const SearchBar = ({searchQuery, setSearchQuery}: 
    {searchQuery: string, setSearchQuery: React.Dispatch<React.SetStateAction<string>>}
    ) => {
    return (
        <div>
            <label htmlFor="search-input">Find Countries: </label>
            <input type="text" 
            id="search-input" 
            value={searchQuery} 
            onChange={(event) => setSearchQuery(event?.target.value)}
            />
        </div>
    )
}

export default SearchBar