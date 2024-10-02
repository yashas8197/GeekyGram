import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../utils/postSlice";
import Post from "../components/Post/Post";

const Explore = () => {
  const dispatch = useDispatch();
  const { error, posts, status } = useSelector((post) => post.posts);

  console.log(posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);
  return (
    <div>
      <ul className="list-group -mt-5">
        {posts?.map((post) => (
          <Post key={post._id} postId={post._id} />
        ))}
      </ul>
    </div>
  );
};

export default Explore;
