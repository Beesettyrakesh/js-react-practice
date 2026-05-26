const RepoItem = ({ repo }) => {
  const { name, stargazers_count, html_url } = repo;
  return (
    <>
      <a href={html_url} target="_blank" rel="noreferrer">
        {name} - Stars: {stargazers_count}
      </a>
    </>
  );
};

export default RepoItem;
