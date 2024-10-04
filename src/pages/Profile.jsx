import EditProfile from "@/components/EditProfile/EditProfile";
import FollowDialog from "@/components/FollowDialog/FollowDialog";
import Post from "@/components/Post/Post";
import { Button } from "@/components/ui/button";
import { fetchPosts } from "@/utils/postSlice";
import useNotFollowingBack from "@/utils/useNotFollowingBack";
import {
  addFollowing,
  fetchUserByUsername,
  unFollowUser,
  updateUserFollowing,
} from "@/utils/userSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SyncLoader } from "react-spinners";

const Profile = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [clickedOn, setClickedOn] = useState("");
  const [isFollowDialogOpen, setIsFollowDialogOpen] = useState(false);
  const [notFollowBack, setNotFollowBack] = useState([]);

  const { posts } = useSelector((post) => post.posts);

  const { user, usersList, ownerUserData, error, status } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    if (user) {
      const result = useNotFollowingBack(user);
      setNotFollowBack(result);
    }
  }, [user]);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchUserByUsername(username));
    dispatch(fetchPosts());
  }, [dispatch, username, user?.avatarURL]);

  const isOwnProfile = username === ownerUserData.username;

  const usersPosts = posts.filter((post) => post.username === username);

  if (!user) return;

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleFollowDialog = (dialogClick) => {
    setClickedOn(dialogClick);
    setIsFollowDialogOpen(true);
  };

  const followRequest = () => {
    const newFollowRequest = {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      avatarURL: user.avatarURL,
    };
    dispatch(
      addFollowing({ userId: "66cf5b279f160ce5ef57dcd1", newFollowRequest })
    );
    dispatch(
      updateUserFollowing({
        id: "66cf5b279f160ce5ef57dcd1",
        dataToUpdate: newFollowRequest,
      })
    );
  };

  const owner = usersList.find((profile) => profile.username === "Katherine");
  const isFollowing = owner?.following.find(
    (follow) => follow.username === user.username
  );

  const unFollowUserHandler = () => {
    if (isFollowing) {
      dispatch(unFollowUser({ userId: owner._id, followId: isFollowing?._id }));
    } else {
      console.log("User is not in the following list");
    }
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
      {status === "loading" ? (
        <div className="flex justify-center items-center min-h-screen -mt-20">
          <SyncLoader size={20} color="#4A90E2" />
        </div>
      ) : usersPosts.length > 0 ? (
        usersPosts.map((post) => (
          <div key={post._id}>
            <Post postId={post._id} />
          </div>
        ))
      ) : (
        <p>No posts available.</p>
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
