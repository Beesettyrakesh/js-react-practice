const RepoItem = ({ repo }) => {
  const { name, stargazers_count, html_url } = repo;
  return (
    <div>
      <a href={html_url} target="_blank" rel="noreferrer">
        {name}
      </a>
      <p>Stars: {stargazers_count}</p>
    </div>
  );
};

export default RepoItem;
