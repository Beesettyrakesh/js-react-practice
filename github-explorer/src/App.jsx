import { useEffect, useState } from "react";
import { fetchRepos, fetchUser, searchUsers } from "./api.js";
import RepoList from "./components/RepoList";
import SearchBar from "./components/SearchBar";
import UserCard from "./components/UserCard";
import UsersList from "./components/UsersList";

function App() {
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRepos, setSelectedRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!error) return;

    const timer = setTimeout(() => {
      setError(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [error]);

  async function handleSearch() {
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

    try {
      const data = await searchUsers(searchKeyWord);
      setSearchResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleUserClick(username) {
    setIsLoading(true);

    try {
      const [{ login, bio, followers, avatar_url }, userReposData] =
        await Promise.all([fetchUser(username), fetchRepos(username)]);

      const user = { login, bio, followers, avatar_url };
      const repos = userReposData.map(
        ({ id, name, description, stargazers_count, html_url }) => ({
          id,
          name,
          description,
          stargazers_count,
          html_url,
        }),
      );

      setSelectedUser(user);
      setSelectedRepos(repos);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
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

      {!isLoading && selectedUser ? (
        <>
          <UserCard user={selectedUser} />
          <RepoList repos={selectedRepos} />
          <button onClick={handleBackBtn}>Back to results</button>
        </>
      ) : (
        !isLoading &&
        searchResults.length > 0 && (
          <>
            <h4>
              Showing {searchResults.length} results for {searchKeyWord}
            </h4>
            <UsersList
              searchResults={searchResults}
              handleUserClick={handleUserClick}
            />
          </>
        )
      )}
    </div>
  );
}

export default App;
