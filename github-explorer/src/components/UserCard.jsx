const UserCard = ({ user }) => {
  const { login, avatar_url, bio, followers } = user;
  return (
    <div>
      <img src={avatar_url} height={200} width={200} alt={login} />
      <p>{login}</p>
      <p>{bio || "No bio available"}</p>
      <p>{followers}</p>
    </div>
  );
};

export default UserCard;
