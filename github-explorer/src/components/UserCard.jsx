const UserCard = ({ user }) => {
  const { login, avatar_url, bio, followers } = user;
  return (
    <div>
      <img src={avatar_url} height={200} width={200} alt={login} />
      <p>Username: {login}</p>
      <p>Bio: {bio || "No bio available"}</p>
      <p>Followers: {followers}</p>
    </div>
  );
};

export default UserCard;
