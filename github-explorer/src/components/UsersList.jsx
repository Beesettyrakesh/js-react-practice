import "../styles/UsersList.css";

const UsersList = ({ searchResults, handleUserClick }) => {
  return (
    <div>
      {searchResults.map((result) => (
        <button
          className="user-btn"
          onClick={() => handleUserClick(result.login)}
          key={result.id}
        >
          {result.login}
        </button>
      ))}
    </div>
  );
};

export default UsersList;
