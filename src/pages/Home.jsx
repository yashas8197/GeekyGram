import Post from "../components/Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchPosts } from "../utils/postSlice";
import { fetchUsers } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import usePostForm from "@/utils/usePostForm";
import { SyncLoader } from "react-spinners";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const [selectedOption, setSelectedOption] = useState("Latest");
  const [initialRender, setInitialRender] = useState(false);
  const user = useSelector((state) => state.users.usersList);
  const dispatch = useDispatch();
  const { postForm, handleUpload, handleChange, handleSubmit, resetForm } =
    usePostForm(initialFormState);
  const fetchData = async () => {
    dispatch(fetchPosts());
    dispatch(fetchUsers());
    setInitialRender(false);
  };

  useEffect(() => {
    fetchData();
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

  const handleSelect = (value) => {
    setSelectedOption(value);
  };

  const sortedPosts = (allPosts, sortBy) => {
    const postsCopy = [...allPosts];
    if (sortBy === "Latest") {
      return postsCopy.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }
    if (sortBy === "Oldest") {
      return postsCopy.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    }
    // Trending
    return postsCopy.sort((a, b) => b.likes.likeCount - a.likes.likeCount);
  };

  const sortPosts = sortedPosts(filteredUsers, selectedOption);

  return (
    <div className="second space-y-10">
      <div className="whatishapp flex gap-4 border-[1px] border-y-gray-600 p-5 rounded-2xl">
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
                <div className="mb-3 w-3/4 h-1/2">
                  {postForm.mediaUrl.type === "video/mp4" ? (
                    <video
                      className="w-3/4 rounded"
                      controls
                      autoPlay
                      muted
                      loop
                    >
                      <source src={URL.createObjectURL(postForm.mediaUrl)} />
                    </video>
                  ) : (
                    <img
                      className="w-1/2 rounded"
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
      <div className="flex justify-between px-3">
        <p>{selectedOption} Posts</p>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <i className="bi bi-sliders cursor-pointer"></i>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleSelect("Trending")}>
              Trending
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSelect("Oldest")}>
              Oldest
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSelect("Latest")}>
              Latest
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="posts">
        {initialRender && status === "loading" ? (
          <div className="flex justify-center h-screen sm:w-full w-screen">
            <SyncLoader size={20} color="#4A90E2" />
          </div>
        ) : sortPosts.length !== 0 ? (
          sortPosts.map((post) => <Post key={post._id} postId={post._id} />)
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
