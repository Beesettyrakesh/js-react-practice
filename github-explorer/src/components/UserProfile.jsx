import RepoList from "./RepoList";
import UserCard from "./UserCard";

// Props: user (object), repos (array)
const UserProfile = ({ user, repos, children }) => {
  return (
    <div>
      <UserCard user={user} />
      <RepoList repos={repos} />
      {children}
    </div>
  );
};

export default UserProfile;
