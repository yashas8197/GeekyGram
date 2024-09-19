import { useNavigate } from "react-router-dom";
const Post = ({ post }) => {
  const navigate = useNavigate();
  const handleProfileClick = (username) => {
    navigate(`/profile/${username}`);
  };
  return (
    <div className="post border-[1px] border-y-gray-600 border-x-0">
      <div className="flex">
        <div className="image my-4 ml-2 w-16 min-w-[4rem]">
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
          <span className="text-gray-500 hidden sm:inline">
            {" "}
            @{post.username} . 6h
          </span>
          <p className="md:max-w-2xl">{post.content}</p>
          <div
            className="md:max-w-xl sm:max-w-sm px-4 cursor-pointer"
            onClick={() => navigate(`/post-details/${post._id}`)}
          >
            {post.mediaUrl && (
              <div className="w-full md:w-[20rem]  m-4 ml-0  cursor-pointer">
                {post?.type === "image" ? (
                  <img
                    className="sm:w-full w-full rounded-lg object-cover"
                    src={post.mediaUrl}
                    alt="Post Media"
                  />
                ) : (
                  <video
                    className="sm:w-full w-full rounded-lg object-cover"
                    controls
                    autoPlay
                    muted
                    loop
                  >
                    <source src={post.mediaUrl} />
                  </video>
                )}
              </div>
            )}
          </div>

          <div className="icons flex justify-evenly text-gray-700">
            <div className="icon flex items-center justify-center">
              <i className="bi bi-chat"></i> 1k
            </div>
            <div className="icon flex items-center justify-center">
              <i className="bi bi-heart"></i> 1k
            </div>
            <div className="icon flex items-center justify-center">
              <i className="bi bi-share"></i>
            </div>
            <div className="icon flex items-center justify-center">
              <i className="bi bi-bookmark"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
