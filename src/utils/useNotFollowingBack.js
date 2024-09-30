const useNotFollowingBack = (user) => {
  if (!user) return [];

  const followingNames = user.following?.map((f) => f.username) || [];
  const followersNames = user.followers?.map((f) => f.username) || [];

  const notFollowingBack = followersNames.filter(
    (username) => !followingNames.includes(username)
  );

  return notFollowingBack;
};

export default useNotFollowingBack;
