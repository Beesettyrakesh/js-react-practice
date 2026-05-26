import { useRef } from "react";

const SearchBar = ({ onSearch }) => {
  const inputRef = useRef(null);

  function handleSearch() {
    onSearch(inputRef.current.value);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <div>
      <span>
        <input
          type="text"
          placeholder="Search"
          ref={inputRef}
          onKeyDown={handleKeyDown}
        />
      </span>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
