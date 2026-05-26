import "./App.css";
import RepoList from "./components/RepoList";
import SearchBar from "./components/SearchBar";
import UserCard from "./components/UserCard";

function App() {
  const mockUser = {
    login: "torvalds",
    avatar_url: "https://avatars.githubusercontent.com/u/1024025",
    bio: "Just for fun",
    followers: 240000,
  };

  const mockRepos = [
    {
      id: 1,
      name: "linux",
      stargazers_count: 180000,
      html_url: "https://github.com/torvalds/linux",
    },
    {
      id: 2,
      name: "subsurface",
      stargazers_count: 2000,
      html_url: "https://github.com/torvalds/subsurface",
    },
  ];

  function handleSearch(query) {
    console.log(`Searched for: ${query}`);
  }

  return (
    <>
      <SearchBar onSearch={handleSearch}></SearchBar>
      <UserCard user={mockUser}></UserCard>
      <RepoList repos={mockRepos}></RepoList>
    </>
  );
}

export default App;
