import { useEffect, useState } from "react";
import { fetchRepos, fetchUser, searchUsers } from "./api.js";
import SearchBar from "./components/SearchBar";
import UserSearchResults from "./components/UserSearchResults.jsx";
import useDebounce from "./hooks/useDebounce.js";
import useLocalStorage from "./hooks/useLocalStorage.js";

function App() {
  const [searchKeyWord, setSearchKeyWord] = useLocalStorage("lastSearch", "");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRepos, setSelectedRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const debouncedSearch = useDebounce(searchKeyWord, 500);

  useEffect(() => {
    if (!error) return;

    const timer = setTimeout(() => {
      setError(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [error]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (debouncedSearch.trim() === "") {
        setSearchResults([]);
        return;
      }

      setError(null);
      setSelectedUser(null);
      setSelectedRepos([]);
      setSearchResults([]);
      setIsLoading(true);

      try {
        const data = await searchUsers(debouncedSearch);
        setSearchResults(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [debouncedSearch]);

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
      />

      <UserSearchResults
        searchResults={searchResults}
        selectedUser={selectedUser}
        selectedRepos={selectedRepos}
        isLoading={isLoading}
        error={error}
        onUserClick={handleUserClick}
        onBack={handleBackBtn}
        query={searchKeyWord}
      />
    </div>
  );
}

export default App;
