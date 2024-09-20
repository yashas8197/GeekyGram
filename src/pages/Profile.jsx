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

  const { user, ownerUserData, status, error } = useSelector(
    (state) => state.users
  );

  const isOwnProfile = username === ownerUserData.username;

  // console.log(user);

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
