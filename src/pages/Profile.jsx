import Post from "@/components/Post/Post";
import { Button } from "@/components/ui/button";
import { fetchPosts } from "@/utils/postSlice";
import { fetchUserByUsername } from "@/utils/userSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { username } = useParams();
  const dispatch = useDispatch();

  const { posts } = useSelector((post) => post.posts);

  useEffect(() => {
    dispatch(fetchUserByUsername(username));
    dispatch(fetchPosts());
  }, [dispatch, username]);

  const { user, status, error } = useSelector((state) => state.users);

  const isOwnProfile = username === "Katherine";

  const ownUserData = {
    _id: "66cf5b279f160ce5ef57dcd1",
    firstName: "Katherine",
    lastName: "Brundage",
    username: "Katherine",
    password: "Katherine",
    avatarURL:
      "https://res.cloudinary.com/darwtgzlk/image/upload/w_400,f_auto,q_auto/v1686251367/socialMedia/profilePictures/user1_wla0x2.jpg",
    bio: "Proud cat lover. Meow .😺🙀😽😼",
    website: "https://peerlist.io/yashasv",
    following: [
      {
        firstName: "Neha",
        lastName: "Dung",
        username: "Neha",
        avatarURL:
          "https://res.cloudinary.com/darwtgzlk/image/upload/w_400,f_auto,q_auto/v1686251365/socialMedia/profilePictures/user4_yobn9s.jpg",
        _id: "66cf5b279f160ce5ef57dcd2",
      },
      {
        firstName: "Beverly",
        lastName: "Myles",
        username: "Beverly",
        avatarURL:
          "https://res.cloudinary.com/darwtgzlk/image/upload/w_400,f_auto,q_auto/v1686251364/socialMedia/profilePictures/user2_dhebgg.jpg",
        _id: "66d84cedc2442e1fa8bab494",
      },
      {
        firstName: "Malik",
        lastName: "Williams",
        username: "Malik",
        avatarURL:
          "https://res.cloudinary.com/darwtgzlk/image/upload/w_400,f_auto,q_auto/v1686251368/socialMedia/profilePictures/user3_atvsaj.jpg",
        _id: "66e4168ba7222d975eafaa14",
      },
    ],
    followers: [
      {
        firstName: "Neha",
        lastName: "Dung",
        username: "Neha",
        avatarURL:
          "https://res.cloudinary.com/darwtgzlk/image/upload/w_400,f_auto,q_auto/v1686251365/socialMedia/profilePictures/user4_yobn9s.jpg",
        _id: "66cf5b279f160ce5ef57dcd4",
      },
      {
        firstName: "Josh",
        lastName: "Tate",
        username: "Josh",
        avatarURL:
          "https://res.cloudinary.com/darwtgzlk/image/upload/w_400,f_auto,q_auto/v1686251365/socialMedia/profilePictures/user10_dmlsg2.jpg",
        _id: "66cf5b279f160ce5ef57dcd5",
      },
    ],
    __v: 98,
    updatedAt: "2024-09-13T10:40:11.373Z",
  };

  console.log(user);

  const usersPosts = posts.filter((post) => post.username === username);

  if (!user) return;

  return (
    <div>
      <div className="profileDetails flex items-center justify-between mb-4 p-4 container">
        <img
          className="rounded-full h-32 w-32 object-cover"
          src={user?.avatarURL}
        />
        {isOwnProfile ? (
          <Button variant="secondary">Edit Profile</Button>
        ) : !ownUserData.following?.find(
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
        <p className="mr-4 cursor-pointer font-bold">
          {user.following.length}
          <span className="font-normal ml-1 text-gray-500">Following</span>
        </p>
        <p className="mr-4 cursor-pointer font-bold">
          {user.followers.length}
          <span className="font-normal ml-1 text-gray-500">Followers</span>
        </p>
      </div>
      {usersPosts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Profile;
