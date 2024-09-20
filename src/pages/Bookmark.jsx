import Post from "@/components/Post/Post";
import { fetchPosts } from "@/utils/postSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Bookmark = () => {
  const dispatch = useDispatch();
  const { error, posts, status } = useSelector((post) => post.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const bookMarkedPosts = posts.filter((post) => post.isMarked === true);
  return (
    <div>
      {bookMarkedPosts.length === 0 && (
        <p className="text-xl text-gray-500 text-center mt-32">
          You have not added any Bookmarks!
        </p>
      )}
      {bookMarkedPosts.map((bookmark) => (
        <Post key={bookmark._id} post={bookmark} />
      ))}
    </div>
  );
};

export default Bookmark;
