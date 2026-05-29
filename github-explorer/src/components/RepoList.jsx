import RepoItem from "./RepoItem";

//Props: repos (array)
const RepoList = ({ repos = [] }) => {
  return (
    <div>
      <h2>Top Repos</h2>
      {repos.length === 0 ? (
        <p>No repos found</p>
      ) : (
        repos.map((repo) => <RepoItem key={repo.id} repo={repo} />)
      )}
    </div>
  );
};

export default RepoList;
