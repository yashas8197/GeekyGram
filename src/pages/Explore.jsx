import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../utils/postSlice";
import Post from "../components/Post/Post";

const Explore = () => {
  const dispatch = useDispatch();
  const { error, posts, status } = useSelector((post) => post.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);
  return (
    <div>
      <ul className="list-group">
        {posts?.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </ul>
    </div>
  );
};

export default Explore;
