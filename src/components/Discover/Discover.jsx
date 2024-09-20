const Discover = ({ whoToFollow }) => {
  return (
    <div className="who sticky top-0 m-3 bg-[#16181c] w-3/4 py-5 rounded-xl space-y-1">
      <h1 className="text-xl font-bold px-3">Who to follow?</h1>
      {whoToFollow?.length ? (
        whoToFollow?.map((user) => (
          <div
            key={user._id}
            className="item py-1 px-6 flex items-center hover:bg-gray-600 justify-between cursor-pointer"
          >
            <div className="p1 mr-2">
              <img
                src={user.avatarURL}
                alt="User Avatar"
                className="p-1 w-16 h-16 rounded-full object-cover "
              />
            </div>
            <div className="p2">
              <p className="font-semibold">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-gray-500">@{user.username}</p>
            </div>
            <div className="p3 flex-grow text-right">
              <button className="px-3 py-2 bg-gray-200 text-black rounded-full font-semibold">
                Follow
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center py-4 text-xl text-gray-500">
          No more suggestions!
        </p>
      )}
    </div>
  );
};

export default Discover;
