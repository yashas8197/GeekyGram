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

const EditProfile = ({ isDialogOpen, setIsDialogOpen, user }) => {
  const [profileAvatar, setProfileAvatar] = useState(user?.avatarURL);
  const [profileBio, setProfileBio] = useState(user?.bio);
  const [profileWebsite, setProfileWebsite] = useState(user?.website);
  const dispatch = useDispatch();

  const saveProfile = () => {
    const dataToUpdate = {
      bio: profileBio,
      website: profileWebsite,
      avatarURL: profileAvatar,
    };
    dispatch(updateUserProfile({ userId: user._id, dataToUpdate }));

    const postDataToUpdate = { avatarURL: profileAvatar };
    dispatch(
      editPostAvatar({
        username: user.username,
        dataToUpdate: postDataToUpdate,
      })
    );
  };

  const handleUpload = (url) => {
    setProfileAvatar(url);
  };
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
