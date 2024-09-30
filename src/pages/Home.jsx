import Post from "../components/Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchPosts } from "../utils/postSlice";
import { fetchUsers } from "../utils/userSlice";

const Home = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const { error, posts, status } = useSelector((post) => post.posts);
  const user = useSelector((state) => state.users.usersList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchUsers());
  }, [dispatch]);

  const userFollowing = (
    user?.find((u) => u.username === "Katherine")?.following || []
  ).map((u) => u.username);

  const filteredUsers = posts.filter((post) =>
    userFollowing.includes(post.username)
  );
  // console.log(posts);

  // console.log(filteredUsers);
  return (
    <div className="second space-y-10">
      <div className="whatishapp flex gap-4">
        <div className="img m-2 w-16">
          <img
            className="mr-3 w-12 h-12 rounded-full object-cover"
            src="https://res.cloudinary.com/darwtgzlk/image/upload/w_400,f_auto,q_auto/v1686251367/socialMedia/profilePictures/user1_wla0x2.jpg"
          />
        </div>
        <div className="w-full">
          <input
            className="w-full h-7 my-5 text-xl bg-black outline-none text-white "
            placeholder="what is happening?!"
          />
          <div>
            <div className="flex justify-between items-center">
              <i className="bi bi-card-image text-blue-500 cursor-pointer"></i>
              <button className="bg-[#39A7F2] px-4 font-bold mx-5 text-sm rounded-full py-2  text-white">
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="posts">
        {filteredUsers.length !== 0 ? (
          filteredUsers.map((post) => <Post key={post._id} post={post} />)
        ) : (
          <p className="text-center text-gray-500 font-semibold">
            Your feed is empty. Follow people to fill it up!
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
