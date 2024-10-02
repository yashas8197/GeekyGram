import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import usePostForm from "@/utils/usePostForm";

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

export const AddPostDialog = ({ isDialogOpen, setIsDialogOpen }) => {
  const navigate = useNavigate();
  const { postForm, handleUpload, handleChange, handleSubmit, resetForm } =
    usePostForm(initialFormState);

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
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="p-6">
        <DialogHeader>
          <DialogTitle className="sm:text-start text-center">
            New Post
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <div className="flex mb-3">
            <img
              className="rounded-full mr-3"
              src={postForm.avatarURL}
              alt="User Avatar"
              onClick={() => navigate("/profile/Katherine")}
              style={{
                width: "50px",
                height: "50px",
                objectFit: "cover",
                cursor: "pointer",
              }}
            />
            <textarea
              rows="3"
              className="bg-[#1C1C1C] resize-none w-full border rounded p-2"
              id="message-text"
              placeholder="What is happening?"
              value={postForm.content}
              onChange={handleChange}
            ></textarea>
          </div>
          {postForm.mediaUrl && (
            <div className="">
              {postForm.mediaUrl.type.startsWith("video/") ? (
                <video className="w-25 rounded" controls autoPlay muted loop>
                  <source src={URL.createObjectURL(postForm.mediaUrl)} />
                </video>
              ) : (
                <img
                  className="w-25 rounded"
                  src={URL.createObjectURL(postForm.mediaUrl)}
                  alt="Preview"
                />
              )}
            </div>
          )}
        </div>

        <div className="flex justify-between mx-10">
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
      </DialogContent>
    </Dialog>
  );
};

export default AddPostDialog;
