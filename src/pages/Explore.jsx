import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../utils/postSlice";
import Post from "../components/Post/Post";
import { CircleLoader } from "react-spinners";

const Explore = () => {
  const [initialRender, setInitialRender] = useState(false);
  const dispatch = useDispatch();
  const { error, posts, status } = useSelector((post) => post.posts);

  const fetchData = async () => {
    dispatch(fetchPosts());
    setInitialRender(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, [dispatch]);
  return (
    <div>
      {initialRender && status === "loading" ? (
        <div className="flex justify-center h-screen sm:w-full mt-10 w-screen">
          <CircleLoader size={20} color="#4A90E2" />
        </div>
      ) : (
        <ul className="list-group -mt-1">
          {posts?.map((post) => (
            <Post key={post._id} postId={post._id} />
          ))}
        </ul>
      )}

      {error && (
        <p className="text-center text-gray-500 font-semibold">
          Something went wrong! {error}
        </p>
      )}
    </div>
  );
};

export default Explore;
