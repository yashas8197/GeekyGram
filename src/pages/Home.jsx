import Post from "../components/Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchPosts } from "../utils/postSlice";
import { fetchUsers } from "../utils/userSlice";
import { CircleLoader } from "react-spinners";
import SortPostsDropdown from "@/components/SortPostsDropdown/SortPostsDropdown";
import CreatePostForm from "@/components/CreatePostForm/CreatePostForm";

const Home = () => {
  const { error, posts, status } = useSelector((post) => post.posts);
  const [selectedOption, setSelectedOption] = useState("Latest");
  const [initialRender, setInitialRender] = useState(true);
  const user = useSelector((state) => state.users.usersList);
  const dispatch = useDispatch();
  const fetchData = async () => {
    dispatch(fetchPosts());
    dispatch(fetchUsers());
    setInitialRender(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, [dispatch]);

  const userFollowing = (
    user?.find((u) => u.username === "Katherine")?.following || []
  ).map((u) => u.username);

  const filteredUsers = posts.filter((post) =>
    userFollowing.includes(post.username)
  );

  const handleSelect = (value) => {
    setSelectedOption(value);
  };

  const sortedPosts = (allPosts, sortBy) => {
    const postsCopy = [...allPosts];
    if (sortBy === "Latest") {
      return postsCopy.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }
    if (sortBy === "Oldest") {
      return postsCopy.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    }
    // Trending
    return postsCopy.sort((a, b) => b.likes.likeCount - a.likes.likeCount);
  };

  const sortPosts = sortedPosts(filteredUsers, selectedOption);

  return (
    <div className="second space-y-10">
      <CreatePostForm />
      <SortPostsDropdown
        handleSelect={handleSelect}
        selectedOption={selectedOption}
      />
      <div className="posts">
        <div className="posts">
          {initialRender && status === "loading" ? (
            <div className="flex justify-center h-screen sm:w-full w-screen">
              <CircleLoader size={20} color="#4A90E2" />
            </div>
          ) : sortPosts.length !== 0 ? (
            sortPosts.map((post) => <Post key={post._id} postId={post._id} />)
          ) : (
            error && (
              <p className="text-center text-gray-500 font-semibold">
                Something went wrong! {error}
              </p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
