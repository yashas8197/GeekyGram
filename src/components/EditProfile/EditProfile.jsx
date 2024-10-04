import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { editPostAvatar } from "@/utils/postSlice";
import { updateUserProfile } from "@/utils/userSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";

const avatarImage = [
  "https://res.cloudinary.com/darwtgzlk/image/upload/v1687601406/socialMedia/avatar/avatar-1_yg7arg.png",
  "https://res.cloudinary.com/darwtgzlk/image/upload/v1687601402/socialMedia/avatar/avatar2_wxqedh.png",
  "https://res.cloudinary.com/darwtgzlk/image/upload/v1687601397/socialMedia/avatar/avatar3_gc9xeu.png",
  "https://res.cloudinary.com/darwtgzlk/image/upload/w_400,f_auto,q_auto/v1686251367/socialMedia/profilePictures/user1_wla0x2.jpg",
];

const EditProfile = ({ isDialogOpen, setIsDialogOpen, user }) => {
  const [profileAvatar, setProfileAvatar] = useState(user?.avatarURL);
  const [profileBio, setProfileBio] = useState(user?.bio);
  const [profileWebsite, setProfileWebsite] = useState(user?.website);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    const dataToUpdate = {
      bio: profileBio,
      website: profileWebsite,
      avatarURL: profileAvatar,
    };
    try {
      dispatch(updateUserProfile({ userId: user._id, dataToUpdate }));

      const postDataToUpdate = { avatarURL: profileAvatar };
      dispatch(
        editPostAvatar({
          username: user.username,
          dataToUpdate: postDataToUpdate,
        })
      );

      setIsDialogOpen(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

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
    <Dialog
      className="relative"
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}
    >
      <DialogContent>
        <DialogHeader>
          <DialogDescription></DialogDescription>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <div className="modal-body ">
          <div className="absolute right-4 top-5">
            <button
              className="border-none rounded-3xl bg-slate-200 text-black text-base font-extrabold py-2 px-5"
              onClick={saveProfile}
            >
              Save
            </button>
          </div>
          <div className="relative inline-block">
            <img
              className="rounded-full w-20 h-20 object-cover"
              src={profileAvatar}
              alt="User Avatar"
            />
            <div className="absolute bottom-0 right-0 m-1 cursor-pointer"></div>
          </div>
          <div className="my-2">
            <p className=" m-0">
              Choose a picture from your gallery or from existing avatars
            </p>
            <div className="flex gap-2 mb-3">
              {avatarImage.map((avatar, i) => (
                <img
                  key={i}
                  className="rounded-full w-20 h-20 object-cover cursor-pointer hover:opacity-75 transition-opacity"
                  src={avatar}
                  alt="User Avatar"
                  onClick={() => setProfileAvatar(avatar)}
                />
              ))}
            </div>
            <p className="font-bold m-0 text-white">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-gray-500 dark:text-gray-400">@{user.username}</p>

            <label className="text-gray-300">Bio:</label>
            <textarea
              className="form-textarea mt-1 block w-full   rounded-md bg-[#1D1D1D]"
              onChange={(e) => setProfileBio(e.target.value)}
              value={profileBio}
            ></textarea>

            <label className="text-gray-300">Website</label>
            <textarea
              type="url"
              className="form-textarea mt-1 block w-full   rounded-md bg-[#1D1D1D]"
              onChange={(e) => setProfileWebsite(e.target.value)}
              value={profileWebsite}
            ></textarea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
