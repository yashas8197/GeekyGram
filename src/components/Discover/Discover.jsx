import {
  addFollowing,
  fetchUsers,
  updateUserFollowers,
  updateUserFollowing,
} from "@/utils/userSlice";
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

  // console.log(whoToFollow);

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

      /* dispatch(
          updateUserFollowers({ id: user._id, dataToUpdate: ownerUserData })
        ); */

      /* dispatch(
        updateUserFollowers({
          id: user._id,
          dataToUpdate: {
            firstName: "Katherine",
            lastName: "Brundage",
            username: "Katherine",
            avatarURL:
              "https://res.cloudinary.com/darwtgzlk/image/upload/w_400,f_auto,q_auto/v1686251367/socialMedia/profilePictures/user1_wla0x2.jpg",
          },
        })
      ); */
    } catch (error) {
      console.error("Error following user:", error);
    }
  };
  return (
    <div className="who mt-6 sticky top-20 mx-3 bg-[#16181c] xl:w-3/4 w-full py-5 rounded-xl space-y-1">
      <h1 className="text-xl font-bold px-3">Who to follow?</h1>
      <div className=" overflow-y-auto" style={{ maxHeight: "400px" }}>
        {whoToFollow?.length ? (
          whoToFollow?.map((user) => (
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
                  className="p-1 w-16 h-16 rounded-full object-cover "
                />
              </div>
              <div
                className="p2"
                onClick={() => navigate(`/profile/${user.username}`)}
              >
                <p className="ont-semibold text-base sm:text-xs md:text-sm">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-gray-500">@{user.username}</p>
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
