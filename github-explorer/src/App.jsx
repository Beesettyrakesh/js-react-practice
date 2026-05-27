import { useState } from "react";
import RepoList from "./components/RepoList";
import SearchBar from "./components/SearchBar";
import UserCard from "./components/UserCard";
import UsersList from "./components/UsersList";

const mockSearchResults = [
  { id: 1, login: "torvalds" },
  { id: 2, login: "gaearon" },
  { id: 3, login: "tj" },
];

const mockUser = {
  login: "torvalds",
  avatar_url: "https://avatars.githubusercontent.com/u/1024025",
  bio: "Just for fun",
  followers: 240000,
};

const mockRepos = [
  {
    id: 1,
    name: "linux",
    stargazers_count: 180000,
    html_url: "https://github.com/torvalds/linux",
  },
  {
    id: 2,
    name: "subsurface",
    stargazers_count: 2000,
    html_url: "https://github.com/torvalds/subsurface",
  },
];

function App() {
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRepos, setSelectedRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleSearch() {
    if (searchKeyWord.trim() === "") {
      setError("Please enter a search term");
      setSearchResults([]);
      return;
    }

    setError(null);
    setSelectedUser(null);
    setSelectedRepos([]);
    setSearchResults([]);
    setIsLoading(true);

    setTimeout(() => {
      setSearchResults(mockSearchResults);
      setIsLoading(false);
    }, 1000);
  }

  function handleUserClick(login) {
    console.log("Selected user:", login);
    setSelectedUser(mockUser);
    setSelectedRepos(mockRepos);
  }

  function handleBackBtn() {
    setSelectedUser(null);
    setSelectedRepos([]);
  }

  function handleSearchInput(value) {
    setSearchKeyWord(value);
  }

  return (
    <div>
      <SearchBar
        searchKeyWord={searchKeyWord}
        onInputChange={handleSearchInput}
        onSearch={handleSearch}
        isLoading={isLoading}
      />

      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}

      {selectedUser ? (
        <>
          <UserCard user={selectedUser} />
          <RepoList repos={selectedRepos} />
          <button onClick={handleBackBtn}>Back to results</button>
        </>
      ) : (
        searchResults.length > 0 && (
          <UsersList
            searchResults={searchResults}
            handleUserClick={handleUserClick}
          />
        )
      )}
    </div>
  );
}

export default App;
