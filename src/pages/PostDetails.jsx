// PostDetails.js
import { useParams } from "react-router-dom";
import Post from "../components/Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPostById, resetCurrentPost } from "../utils/postSlice";

const PostDetails = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const { error, currentPost, status } = useSelector((post) => post.posts);

  console.log(postId);

  useEffect(() => {
    dispatch(resetCurrentPost());
    dispatch(fetchPostById(postId));
  }, [postId, dispatch]);

  if (currentPost === null) return null;

  console.log(currentPost);

  return (
    <div>
      {status === "loading" && <div className="text-center"></div>}
      {status === "error" && (
        <div className="alert alert-danger">Error: {error}</div>
      )}
      {currentPost && <Post post={currentPost} />}
    </div>
  );
};

export default PostDetails;
