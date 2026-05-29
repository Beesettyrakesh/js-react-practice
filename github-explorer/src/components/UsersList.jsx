import "../styles/UsersList.css";

//Props: searchResults (array), onUserClick (function)
const UsersList = ({ searchResults, onUserClick }) => {
  return (
    <div>
      {searchResults.map((result) => (
        <button
          className="user-btn"
          onClick={() => onUserClick(result.login)}
          key={result.id}
        >
          {result.login}
        </button>
      ))}
    </div>
  );
};

export default UsersList;
