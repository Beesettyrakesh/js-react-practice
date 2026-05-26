const UserCard = ({ user }) => {
  const { login, avatar_url, bio, followers } = user;
  return (
    <>
      <img src={avatar_url} height={200} width={200} />
      <p>{login}</p>
      <p>{bio || "No bio available"}</p>
      <p>{followers}</p>
    </>
  );
};

export default UserCard;
