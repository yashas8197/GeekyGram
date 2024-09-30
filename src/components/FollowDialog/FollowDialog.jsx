import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { unFollowUser } from "@/utils/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const FollowDialog = ({
  isFollowDialogOpen,
  setIsFollowDialogOpen,
  clickedOn,
  notFollowBack,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

  const usersToDisplay =
    clickedOn === "following" ? user.following : user.followers;

  const unFollowUserHandler = (id) => {
    dispatch(unFollowUser({ userId: user._id, followId: id }));

    /* dispatch(
      fetchUserByUsername(
        currentUser === undefined ? ownerUserData.username : currentUser
      )
    ); */
  };

  const handleProfileClick = (username) => {
    navigate(`/profile/${username}`);
    setIsFollowDialogOpen(false);
  };

  return (
    <div>
      <Dialog open={isFollowDialogOpen} onOpenChange={setIsFollowDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="uppercase tracking-widest">
              {clickedOn}
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="">
            <div className="">
              <div className="p-4">
                {usersToDisplay?.length ? (
                  usersToDisplay.map((follow) => (
                    <div
                      key={follow._id}
                      className="flex items-center mb-4 cursor-pointer"
                    >
                      <div
                        className="flex items-center"
                        data-bs-dismiss="modal"
                        onClick={() => handleProfileClick(follow.username)}
                      >
                        <img
                          src={follow.avatarURL}
                          alt="User Avatar"
                          className="rounded-full w-12 h-12 object-cover mr-3"
                        />
                        <div className="flex-grow">
                          <p className="font-semibold mb-0">
                            {follow.firstName} {follow.lastName}
                          </p>
                          <p className="text-gray-500 text-sm">
                            @{follow.username}
                          </p>
                        </div>
                      </div>
                      {follow.username !== "Katherine" && (
                        <button
                          className="ml-auto border-none rounded-3xl bg-slate-200 text-black text-base font-extrabold py-2 px-5"
                          data-bs-dismiss="modal"
                          onClick={() => unFollowUserHandler(follow._id)}
                        >
                          {notFollowBack.includes(follow.username)
                            ? "Follow"
                            : "Following"}
                        </button>
                      )}
                    </div>
                  ))
                ) : (
                  <>
                    {clickedOn === "following" ? (
                      <p className="text-center text-gray-500 text-xl">
                        Not following anyone!
                      </p>
                    ) : (
                      <p className="text-center text-gray-500 text-xl">
                        No Followers!
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FollowDialog;
