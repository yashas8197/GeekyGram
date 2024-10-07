import { useSelector } from "react-redux";
import { Button } from "../ui/button";

const ProfileDetailsCard = ({
  user,
  handleFollowDialog,
  handleOpenDialog,
  unFollowUserHandler,
  followRequest,
  username,
  usersPosts,
  isFollowing,
}) => {
  const { ownerUserData, status } = useSelector((state) => state.users);

  const isOwnProfile = username === ownerUserData.username;
  return (
    <div>
      <div className="profileDetails flex  items-center p-4 justify-between mb-4">
        <img
          className="rounded-full h-32 w-32 object-cover"
          src={user?.avatarURL}
        />
        {isOwnProfile ? (
          <button
            className="border-none rounded-3xl bg-slate-200 text-black text-base font-extrabold py-2 px-5"
            onClick={handleOpenDialog}
          >
            Edit Profile
          </button>
        ) : isFollowing ? (
          <Button
            onClick={unFollowUserHandler}
            variant="secondary"
            className="py-6"
          >
            Following
          </Button>
        ) : (
          <Button onClick={followRequest} variant="secondary" className="py-6">
            Follow
          </Button>
        )}
      </div>
      <div className="mb-4 px-4">
        <p className="text-2xl font-extrabold">
          {user.firstName} {user.lastName}
        </p>
        <p className="text-gray-400">@{user.username}</p>
      </div>
      <div className="mb-4 px-4">
        <p>{user.bio}</p>
      </div>
      <div className="p-4">
        <a href={user.website} target="_blank">
          {user.website}
        </a>
      </div>
      <div className="flex mb-6 px-4">
        <p className="mr-4 cursor-pointer font-bold">
          {usersPosts.length}
          <span className="font-normal ml-1 text-gray-500">Posts</span>
        </p>
        <p
          className="mr-4 cursor-pointer font-bold"
          onClick={() => handleFollowDialog("following")}
        >
          {user.following.length}
          <span className="font-normal ml-1 text-gray-500">Following</span>
        </p>
        <p
          className="mr-4 cursor-pointer font-bold"
          onClick={() => handleFollowDialog("followers")}
        >
          {user.followers.length}
          <span className="font-normal ml-1 text-gray-500">Followers</span>
        </p>
      </div>
    </div>
  );
};

export default ProfileDetailsCard;
