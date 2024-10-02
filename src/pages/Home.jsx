import Post from "../components/Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchPosts } from "../utils/postSlice";
import { fetchUsers } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import usePostForm from "@/utils/usePostForm";

const initialFormState = {
  firstName: "Katherine",
  lastName: "Brundage",
  avatarURL:
    "https://res.cloudinary.com/darwtgzlk/image/upload/w_400,f_auto,q_auto/v1686251367/socialMedia/profilePictures/user1_wla0x2.jpg",
  username: "Katherine",
  content: "",
  mediaUrl: "",
  type: "",
};

const Home = () => {
  const { error, posts, status } = useSelector((post) => post.posts);
  const user = useSelector((state) => state.users.usersList);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postForm, handleUpload, handleChange, handleSubmit, resetForm } =
    usePostForm(initialFormState);
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

  const handleMediaInput = (e) => {
    const file = e.target.files[0];
    if (file?.type.startsWith("image/") || file.type.startsWith("video/")) {
      if (file.size < 20 * 1024 * 1024) {
        handleUpload(file);
      } else {
        console.error("file must be less than 20mb");
      }
    } else {
      console.error("file must be a Video (MP4/MOV) or an Image (JPEG/PNG)");
    }
  };

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
          <form
            action="/api/v1/post"
            method="POST"
            encType="multipart/form-data"
          >
            <input
              value={postForm.content}
              onChange={handleChange}
              className="w-full h-7 my-5 text-xl bg-black outline-none text-white "
              placeholder="what is happening?!"
            />
            <div>
              {postForm.mediaUrl && (
                <div className="mb-3">
                  {postForm.mediaUrl.type === "video/mp4" ? (
                    <video
                      className="w-25 rounded"
                      controls
                      autoPlay
                      muted
                      loop
                    >
                      <source src={URL.createObjectURL(postForm.mediaUrl)} />
                    </video>
                  ) : (
                    <img
                      className="w-25 rounded"
                      src={URL.createObjectURL(postForm.mediaUrl)}
                      alt="Preview"
                    />
                  )}
                </div>
              )}

              <div className="flex justify-between items-center">
                <label htmlFor="mediaForCreate">
                  <i className="bi bi-card-image text-blue-500 cursor-pointer"></i>
                  <input
                    onChange={handleMediaInput}
                    type="file"
                    name="mediaUrl"
                    id="mediaForCreate"
                    className="hidden"
                  />
                </label>

                <button
                  onClick={(e) => handleSubmit(e, resetForm)}
                  disabled={!postForm.content}
                  className={`bg-[#39A7F2] px-4 font-bold mx-5 text-sm rounded-full py-2  text-white ${
                    !postForm.content && "cursor-not-allowed"
                  }`}
                >
                  Post
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="posts">
        {filteredUsers.length !== 0 ? (
          filteredUsers.map((post) => <Post key={post._id} postId={post._id} />)
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
