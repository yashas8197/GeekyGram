import { fetchUsers } from "@/utils/userSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Discover = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  const { usersList, ownerUserData, loading } = useSelector(
    (state) => state.users
  );

  const whoToFollow = ownerUserData
    ? usersList?.filter(
        (user) =>
          user.username !== "Katherine" &&
          !ownerUserData.following.some(
            (following) => following.username === user.username
          )
      )
    : [];
  return (
    <div className="who sticky top-0 m-3 bg-[#16181c] xl:w-3/4 w-full py-5 rounded-xl space-y-1 ">
      <h1 className="text-xl font-bold px-3">Who to follow?</h1>
      {whoToFollow?.length ? (
        whoToFollow?.map((user) => (
          <div
            key={user._id}
            className="item discover flex-wrap py-1 px-6 flex items-center hover:bg-gray-600 justify-between cursor-pointer"
            onClick={() => navigate(`/profile/${user.username}`)}
          >
            <div className="p1 mr-2">
              <img
                src={user.avatarURL}
                alt="User Avatar"
                className="p-1 w-16 h-16 rounded-full object-cover "
              />
            </div>
            <div className="p2">
              <p className="ont-semibold text-base sm:text-xs md:text-sm">
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
