import { useToast } from "@/hooks/use-toast";
import {
  commentPost,
  likePost,
  likeThePost,
  updatePost,
} from "@/utils/postSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PostToolBar from "../PostToolBar/PostToolBar";
import { getTimeAgo } from "@/utils/getTimeAgo";

const Post = ({ postId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { ownerUserData, status, error } = useSelector((state) => state.users);

  const { posts } = useSelector((state) => state.posts);

  const post = posts.find((post) => post._id === postId);

  const [showComment, setShowComment] = useState(false);
  const [textComment, setTextComment] = useState("");
  const [localComments, setLocalComments] = useState(post?.comments || []);
  const [isMarked, setIsMarked] = useState(post?.isMarked);

  const likedAlready = post?.likes?.likedBy?.find(
    (user) => user.username === ownerUserData.username
  );

  const [isLiked, setIsLiked] = useState(
    likedAlready?.username.includes("Katherine")
  );

  const handleProfileClick = (username) => {
    navigate(`/profile/${username}`);
  };

  if (!postId) return;

  const copyToClipboard = async (postId) => {
    let link = window.location.origin + "/post-details/" + postId;
    await navigator.clipboard.writeText(link);
    toast({
      description: "✅ Link Successfully copied!",
      variant: "default",
      duration: 1200,
    });
  };

  const handleComment = (postId) => {
    setShowComment((prevPostId) => (prevPostId === postId ? null : postId));
  };

  const handleLike = (postId) => {
    const dataToUpdate = {
      firstName: ownerUserData.firstName,
      lastName: ownerUserData.lastName,
      username: ownerUserData.username,
      avatarURL: ownerUserData.avatarURL,
    };
    setIsLiked((prevIsLiked) => !prevIsLiked);
    dispatch(likeThePost({ postId, username: ownerUserData.username }));
    dispatch(likePost({ postId, dataToUpdate: dataToUpdate }));
  };

  const postComment = (postId) => {
    const dataToUpdate = {
      firstName: ownerUserData.firstName,
      lastName: ownerUserData.lastName,
      username: ownerUserData.username,
      avatarURL: ownerUserData.avatarURL,
      text: textComment,
    };

    setLocalComments((prev) => [...prev, dataToUpdate]);
    dispatch(commentPost({ postId, dataToUpdate }));
    setTextComment("");
  };

  const handleBookMark = (id, post) => {
    const updatedMarked = !isMarked;
    setIsMarked(updatedMarked);
    dispatch(
      updatePost({ postId: id, updateData: { isMarked: !post.isMarked } })
    );
  };

  return (
    <div className="post border-[1px] border-y-gray-800 border-x-gray-800">
      <div className="p-4">
        <div className="flex">
          <div className="image my-4 ml-2 w-16 min-w-[4rem] h-8">
            <img
              className="w-12 h-12 rounded-full object-cover "
              src={post.avatarURL}
              onClick={() => handleProfileClick(post.username)}
            />
          </div>

          <div className="content my-3">
            <span
              className="font-bold hover:underline cursor-pointer text-white"
              onClick={() => handleProfileClick(post.username)}
            >
              {post.firstName} {post.lastName}
            </span>
            <span className="text-gray-500 mx-2 hidden sm:inline">
              @{post.username} . {getTimeAgo(post.createdAt)}
            </span>
            <p className="md:max-w-lg">{post.content}</p>
          </div>
          {post.username === ownerUserData.username && (
            <div className="post-toolbar flex-grow relative text-right">
              <PostToolBar post={post} />
            </div>
          )}
        </div>
        <div className="">
          <div
            className="sm:w-[80%] sm:mx-auto px-4 cursor-pointer"
            onClick={() => navigate(`/post-details/${post._id}`)}
          >
            {post.mediaUrl && (
              <div className="w-full m-4 ml-0  cursor-pointer">
                {post?.type === "image" ? (
                  <img
                    className="w-full rounded-lg object-cover"
                    src={post.mediaUrl}
                    alt="Post Media"
                  />
                ) : (
                  <video
                    className="sm:w-3/4 rounded-lg object-cover"
                    controls
                    muted
                    loop
                  >
                    <source src={post.mediaUrl} />
                  </video>
                )}
              </div>
            )}
          </div>

          <div className="icons mx-auto flex md:w-[max-w-xl] justify-evenly text-gray-700">
            <div
              className={`icon flex items-center justify-center cursor-pointer ${
                showComment ? "text-[#39A7F2]" : ""
              }`}
              onClick={() => handleComment(post._id)}
            >
              <i className="bi bi-chat mr-1"></i> {post.comments.length}
            </div>
            <div
              className={`icon flex items-center justify-center cursor-pointer ${
                isLiked ? "text-[#39A7F2]" : "text-gray-400"
              }`}
              onClick={() => handleLike(post._id)}
            >
              <i className="bi bi-heart-fill"></i> {post.likes.likeCount}
            </div>
            <div
              onClick={() => copyToClipboard(post._id)}
              className="icon flex items-center justify-center cursor-pointer"
            >
              <i className="bi bi-share"></i>
            </div>
            <div
              className={`icon flex items-center justify-center cursor-pointer ${
                isMarked === true ? "text-[#39A7F2]" : "text-gray-400"
              } `}
              onClick={() => handleBookMark(post._id, post)}
            >
              <i className="bi bi-bookmark-fill"></i>
            </div>
          </div>
          {showComment && (
            <div className="commect-section md:max-w-screen-2xl">
              <div className="flex border border-x-black border-t-black border-b-[#292929] my-4">
                <div className="m-2">
                  <img
                    className="w-12 h-12 rounded-full object-cover "
                    src={post.avatarURL}
                  />
                </div>
                <div className="rounded-2xl flex flex-grow">
                  <textarea
                    placeholder="your reply!"
                    className="bg-[#000] border-none flex flex-grow text-xl h-16 resize-none w-5"
                    value={textComment}
                    onChange={(e) => setTextComment(e.target.value)}
                  ></textarea>
                  <div className="items-end ml-2">
                    <button
                      onClick={() => postComment(post._id)}
                      disabled={textComment.length === 0}
                      className="bg-[#39A7F2] px-4 mx-5 text-lg rounded-full py-1  text-white"
                    >
                      Reply
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <div>
                  {localComments.map((comment, i) => (
                    <div key={i} className="flex flex-row flex-nowrap mb-4">
                      <div className="m-2">
                        <img
                          className="w-12 h-12 rounded-full object-cover "
                          src={comment.avatarURL}
                        />
                      </div>
                      <div className="w-full">
                        <div className="flex">
                          <p className="cursor-pointer font-semibold mr-2">
                            {comment.firstName} {comment.lastName}
                          </p>
                          <span className="text-gray-500">
                            @{comment.username}
                          </span>
                          <span className="max-w-24 text-gray-500 ml-2 sm:max-w-24 md:inline-block hidden sm:overflow-ellipsis sm:whitespace-nowrap text-nowrap">
                            {new Date(comment.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </span>
                        </div>
                        <div className="h-auto md:max-w-lg sm:max-w-sm break-words">
                          {comment.text}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
