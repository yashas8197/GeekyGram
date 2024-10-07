import Post from "@/components/Post/Post";
import { fetchPosts } from "@/utils/postSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircleLoader } from "react-spinners";

const Bookmark = () => {
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

  const bookMarkedPosts = posts.filter((post) => post.isMarked === true);

  return (
    <div className="sm:mb-0 mb-10">
      {initialRender && status === "loading" ? (
        <div className="flex justify-center h-screen sm:w-full w-screen mt-10">
          <CircleLoader size={20} color="#4A90E2" />
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
