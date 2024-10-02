import EditProfile from "@/components/EditProfile/EditProfile";
import FollowDialog from "@/components/FollowDialog/FollowDialog";
import Post from "@/components/Post/Post";
import { Button } from "@/components/ui/button";
import { fetchPosts } from "@/utils/postSlice";
import useNotFollowingBack from "@/utils/useNotFollowingBack";
import { fetchUserByUsername } from "@/utils/userSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [clickedOn, setClickedOn] = useState("");
  const [isFollowDialogOpen, setIsFollowDialogOpen] = useState(false);
  const [notFollowBack, setNotFollowBack] = useState([]);

  const { posts } = useSelector((post) => post.posts);

  useEffect(() => {
    dispatch(fetchUserByUsername(username));
    dispatch(fetchPosts());
  }, [dispatch, username]);

  const { user, ownerUserData, error, status } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    if (user) {
      const result = useNotFollowingBack(user);
      setNotFollowBack(result);
    }
  }, [user]);

  const isOwnProfile = username === ownerUserData.username;

  // console.log(user);

  const usersPosts = posts.filter((post) => post.username === username);

  // console.log(usersPosts);

  if (!user) return;

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleFollowDialog = (dialogClick) => {
    setClickedOn(dialogClick);
    setIsFollowDialogOpen(true);
  };

  return (
    <div>
      <div className="profileDetails flex items-center justify-between mb-4 p-4 container">
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
        ) : !ownerUserData.following?.find(
            (user) => user.username === username
          ) ? (
          <Button variant="secondary" className="py-6">
            Follow
          </Button>
        ) : (
          <Button variant="secondary" className="py-6">
            Following
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
      {status !== "loading" ? (
        usersPosts.map((post) => (
          <div key={post._id}>
            <Post postId={post._id} />
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}

      <EditProfile
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        user={user}
        currentUser={user.username}
      />
      <FollowDialog
        setIsFollowDialogOpen={setIsFollowDialogOpen}
        isFollowDialogOpen={isFollowDialogOpen}
        clickedOn={clickedOn}
        currentUser={user.username}
        user={user}
        notFollowBack={notFollowBack}
      />
    </div>
  );
};

export default Profile;
