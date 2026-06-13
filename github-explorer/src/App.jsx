import { useEffect, useState } from "react";
import { searchUsers } from "./api.js";
import SearchBar from "./components/SearchBar";
import UserSearchResults from "./components/UserSearchResults.jsx";
import useDebounce from "./hooks/useDebounce.js";
import useFetch from "./hooks/useFetch.js";
import useLocalStorage from "./hooks/useLocalStorage.js";

function App() {
  const baseUrl = "https://api.github.com";
  const [searchKeyWord, setSearchKeyWord] = useLocalStorage("lastSearch", "");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedUsername, setSelectedUsername] = useState(null);
  const debouncedSearch = useDebounce(searchKeyWord, 500);

  const {
    data: selectedUser,
    isLoading: userLoading,
    error: userError,
  } = useFetch(
    selectedUsername ? `${baseUrl}/users/${selectedUsername}` : null,
  );
  const profileUser = selectedUsername ? selectedUser : null;

  const {
    data: repos,
    isLoading: reposLoading,
    error: reposError,
  } = useFetch(
    selectedUsername
      ? `${baseUrl}/users/${selectedUsername}/repos?sort=updated&per_page=5`
      : null,
  );

  const userRepos = selectedUsername
    ? repos
      ? repos.map(({ id, name, description, stargazers_count, html_url }) => ({
          id,
          name,
          description,
          stargazers_count,
          html_url,
        }))
      : []
    : null;

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
      setSelectedUsername(null);
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

  const showLoading = isLoading || userLoading || reposLoading;
  const showError = error || userError || reposError;

  function handleUserClick(username) {
    setSelectedUsername(username);
  }

  function handleBackBtn() {
    setSelectedUsername(null);
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
        selectedUser={profileUser}
        selectedRepos={userRepos}
        isLoading={showLoading}
        error={showError}
        onUserClick={handleUserClick}
        onBack={handleBackBtn}
        query={searchKeyWord}
      />
    </div>
  );
}

export default App;
