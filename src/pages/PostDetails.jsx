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

  useEffect(() => {
    dispatch(resetCurrentPost());
    dispatch(fetchPostById(postId));
  }, [postId, dispatch]);

  if (currentPost === null) return null;

  return (
    <div className="sm:mb-0 mb-10 -mt-4">
      {status === "loading" && <div className="text-center"></div>}
      {status === "error" && (
        <div className="alert alert-danger">Error: {error}</div>
      )}
      {currentPost && <Post postId={postId} />}
    </div>
  );
};

export default PostDetails;
