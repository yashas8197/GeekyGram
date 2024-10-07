import {
  addFollowing,
  fetchUsers,
  updateUserFollowers,
  updateUserFollowing,
} from "@/utils/userSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CircleLoader } from "react-spinners";

const Discover = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const { usersList, ownerUserData, status } = useSelector(
    (state) => state.users
  );

  const ownerUser =
    usersList?.find((user) => user.username === ownerUserData.username) || [];

  const whoToFollow = ownerUser
    ? usersList?.filter(
        (user) =>
          user.username !== ownerUserData.username &&
          !ownerUser.following.some(
            (following) => following.username === user.username
          )
      )
    : [];

  const followRequest = (user) => {
    try {
      const newFollowRequest = {
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        avatarURL: user.avatarURL,
      };
      dispatch(
        addFollowing({ userId: "66cf5b279f160ce5ef57dcd1", newFollowRequest })
      );

      dispatch(
        updateUserFollowing({
          id: "66cf5b279f160ce5ef57dcd1",
          dataToUpdate: newFollowRequest,
        })
      );
    } catch (error) {
      console.error("Error following user:", error);
    }
  };
  return status === "loading" ? (
    <div className="flex justify-center py-5">
      <CircleLoader color="#4A90E2" size={30} />
    </div>
  ) : (
    <div className="who mt-6 sticky top-20 mx-3 bg-[#16181c] xl:w-3/4 w-full py-5 rounded-xl space-y-1">
      <h1 className="text-xl font-bold px-3">Who to follow?</h1>
      <div className="overflow-y-auto" style={{ maxHeight: "400px" }}>
        {whoToFollow?.length ? (
          whoToFollow.map((user) => (
            <div
              key={user._id}
              className="item discover flex-wrap py-1 px-6 flex items-center hover:bg-gray-600 justify-between cursor-pointer"
            >
              <div
                className="p1 mr-2"
                onClick={() => navigate(`/profile/${user.username}`)}
              >
                <img
                  src={user.avatarURL}
                  alt="User Avatar"
                  className="p-1 w-16 h-16 rounded-full object-cover"
                />
              </div>
              <div
                className="cursor-pointer"
                onClick={() => navigate(`/profile/${user.username}`)}
              >
                <p className="font-semibold text-base sm:text-sm md:text-sm truncate md:w-24 xl:w-24">
                  <span>{user.firstName}</span>{" "}
                  <span className="truncate">{user.lastName}</span>
                </p>
                <p className="text-gray-500 truncate md:w-24 xl:w-24">
                  @{user.username}
                </p>
              </div>
              <div className="p3 flex-grow text-right">
                <button
                  onClick={() => followRequest(user)}
                  className="px-3 py-2 bg-gray-200 text-black rounded-full font-semibold"
                >
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
    </div>
  );
};

export default Discover;
