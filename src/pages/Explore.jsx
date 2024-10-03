import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../utils/postSlice";
import Post from "../components/Post/Post";
import { SyncLoader } from "react-spinners";

const Explore = () => {
  const dispatch = useDispatch();
  const { error, posts, status } = useSelector((post) => post.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);
  return (
    <div>
      {status === "loading" ? (
        <div className="flex justify-center h-screen sm:w-full mt-10 w-screen">
          <SyncLoader size={20} color="#4A90E2" />
        </div>
      ) : (
        <ul className="list-group -mt-1">
          {posts?.map((post) => (
            <Post key={post._id} postId={post._id} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Explore;
