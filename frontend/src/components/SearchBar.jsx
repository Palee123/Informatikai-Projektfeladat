function SearchBar({
    searchTerm,
    setSearchTerm
}) {

    return (
        <input
            type="text"
            className="search-input"
            placeholder="Keresés..."
            value={searchTerm}
            onChange={(e) =>
                setSearchTerm(e.target.value)
            }
        />
    );
}

export default SearchBar;