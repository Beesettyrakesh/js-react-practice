import RepoItem from "./RepoItem";

const RepoList = ({ repos }) => {
  return (
    <>
      <h2>Top Repos</h2>
      {repos.length === 0 ? (
        <p>No repos found</p>
      ) : (
        repos.map((repo) => <RepoItem key={repo.id} repo={repo}></RepoItem>)
      )}
    </>
  );
};

export default RepoList;
