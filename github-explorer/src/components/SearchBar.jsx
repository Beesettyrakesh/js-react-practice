const SearchBar = ({ searchKeyWord, onInputChange, onSearch, isLoading }) => {
  function handleKeyDown(event) {
    if (event.key === "Enter") {
      onSearch();
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={searchKeyWord}
        onChange={(event) => onInputChange(event.target.value)}
        onKeyDown={handleKeyDown}
      />

      <button onClick={onSearch} disabled={isLoading}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
