import Post from "@/components/Post/Post";
import { fetchPosts } from "@/utils/postSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SyncLoader } from "react-spinners";

const Bookmark = () => {
  const dispatch = useDispatch();
  const { error, posts, status } = useSelector((post) => post.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const bookMarkedPosts = posts.filter((post) => post.isMarked === true);

  return (
    <div className="-mt-1">
      {status === "loading" ? (
        <div className="flex justify-center h-screen sm:w-full w-screen mt-10">
          <SyncLoader size={20} color="#4A90E2" />
        </div>
      ) : (
        <>
          {bookMarkedPosts.length === 0 ? (
            <p className="text-xl text-gray-500 text-center mt-32">
              You have not added any Bookmarks!
            </p>
          ) : (
            bookMarkedPosts.map((bookmark) => (
              <Post key={bookmark._id} postId={bookmark._id} />
            ))
          )}
        </>
      )}
    </div>
  );
};

export default Bookmark;
