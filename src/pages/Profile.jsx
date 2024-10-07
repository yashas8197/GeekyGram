import EditProfile from "@/components/EditProfile/EditProfile";
import FollowDialog from "@/components/FollowDialog/FollowDialog";
import Post from "@/components/Post/Post";
import ProfileDetailsCard from "@/components/ProfileDetailsCard/ProfileDetailsCard";
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
import { CircleLoader } from "react-spinners";

const Profile = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [clickedOn, setClickedOn] = useState("");
  const [isFollowDialogOpen, setIsFollowDialogOpen] = useState(false);
  const [notFollowBack, setNotFollowBack] = useState([]);

  const { posts } = useSelector((post) => post.posts);

  const { user, usersList, error, status } = useSelector(
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
      <ProfileDetailsCard
        user={user}
        isFollowing={isFollowing}
        username={username}
        usersPosts={usersPosts}
        handleFollowDialog={handleFollowDialog}
        handleOpenDialog={handleOpenDialog}
        followRequest={followRequest}
        unFollowUserHandler={unFollowUserHandler}
      />
      {status === "loading" ? (
        <div className="flex justify-center items-center min-h-screen -mt-20">
          <CircleLoader size={20} color="#4A90E2" />
        </div>
      ) : usersPosts.length > 0 ? (
        usersPosts
          .slice()
          .reverse()
          .map((post) => (
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
