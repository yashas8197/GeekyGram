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
import { toast } from "@/hooks/use-toast";

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
    if (file?.type.startsWith("image/")) {
      if (file.size < 20 * 1024 * 1024) {
        handleUpload(file);
      } else {
        toast({
          description: "file must be less than 20mb",
          variant: "default",
          duration: 900,
        });
      }
    } else {
      toast({
        description: "file must be an Image (JPEG/PNG)",
        variant: "default",
        duration: 900,
      });
    }
  };

  const handleRemoveImage = () => {
    const reset = "";
    handleUpload(reset);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="p-6 overflow-y-auto max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-center">New Post</DialogTitle>
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
            <div className="relative">
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
              <div className="">
                <i
                  onClick={handleRemoveImage}
                  className="bi bi-x absolute top-1 cursor-pointer  right-1 rounded-full px-1 bg-black"
                ></i>
              </div>
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
            onClick={(e) => {
              handleSubmit(e, resetForm);
              setIsDialogOpen(false);
            }}
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
