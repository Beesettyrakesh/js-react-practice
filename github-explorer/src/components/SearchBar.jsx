// Props: searchKeyWord (string), onInputChange (function)
const SearchBar = ({ searchKeyWord, onInputChange }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={searchKeyWord}
        onChange={(event) => onInputChange(event.target.value)}
      />
    </div>
  );
};

export default SearchBar;
