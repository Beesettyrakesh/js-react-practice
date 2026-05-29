import ErrorMessage from "./ErrorMessage";
import UserProfile from "./UserProfile";
import UsersList from "./UsersList";

// Props: searchResults (array), selectedUser (object), selectedRepos (array),
// isLoading (boolean), error (string), onUserClick (function), onBack (function),
const UserSearchResults = ({
  searchResults,
  selectedUser,
  selectedRepos,
  isLoading,
  error,
  onUserClick,
  onBack,
  query,
}) => {
  return (
    <div>
      {isLoading && <p>Loading...</p>}

      {error && <ErrorMessage error={error} />}

      {!isLoading && selectedUser ? (
        <>
          <UserProfile user={selectedUser} repos={selectedRepos}>
            <button onClick={onBack}>Back to results</button>
          </UserProfile>
        </>
      ) : (
        !isLoading &&
        searchResults.length > 0 && (
          <>
            <h4>
              Showing {searchResults.length} results for {query}
            </h4>
            <UsersList
              searchResults={searchResults}
              onUserClick={onUserClick}
            />
          </>
        )
      )}
    </div>
  );
};

export default UserSearchResults;
