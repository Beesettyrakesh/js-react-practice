//Props: repo (object)
const RepoItem = ({ repo }) => {
  const { name, description, stargazers_count, html_url } = repo;
  return (
    <div>
      <h3>{name}</h3>
      <span>Link: </span>
      <a href={html_url} target="_blank" rel="noreferrer">
        {name}
      </a>
      <p>Description: {description || "No description availabale"}</p>
      <span style={{ color: "gold", fontSize: "20px" }}>&#9733;</span>
      <span>Stars: {stargazers_count}</span>
    </div>
  );
};

export default RepoItem;
