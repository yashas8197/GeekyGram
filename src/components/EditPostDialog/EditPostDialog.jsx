import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { editPostApi, setPost } from "@/utils/postSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export function EditPostDialog({ isDialogOpen, setIsDialogOpen }) {
  const { editPost, status } = useSelector((state) => state.posts);
  const [updatedContent, setUpdatedContent] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [type, setType] = useState("");
  const dispatch = useDispatch();

  console.log(editPost);

  useEffect(() => {
    if (editPost) {
      setUpdatedContent(editPost.content || "");
      setMediaUrl(editPost.mediaUrl || "");
      setType(editPost?.mediaUrl?.endsWith(".mp4") ? "video" : "image" || "");
    }
  }, []);

  // if (status === "loading" || !editPost) return;
  const handleUpload = (url) => {
    setMediaUrl(url);
    setType(url?.endsWith(".mp4") ? "video" : "image" || "");
  };

  const postEditHandle = (e) => {
    e.preventDefault();
    const dataToUpdate = {
      mediaUrl: mediaUrl,
      type: type,
      content: updatedContent,
    };
    dispatch(editPostApi({ id: editPost._id, dataToUpdate: dataToUpdate }));
    dispatch(setPost({}));
    setUpdatedContent("");
    setMediaUrl("");
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <span>Edit Post</span>
      </DialogTrigger>
      <DialogContent className=" md:max-w-md max-w-4xl p-4 md:p-6 max-h-screen overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Your Post</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div className="modal-body">
          <form>
            <div className="mb-3 flex items-center">
              <img
                className="rounded-full mr-3"
                alt="User Avatar"
                src={editPost.avatarURL}
                style={{
                  width: "50px",
                  height: "50px",
                  objectFit: "cover",
                  cursor: "pointer",
                }}
              />
              <textarea
                rows="3"
                className="w-full border-none outline-none rounded-lg bg-[#1D1D1D] p-2"
                id="message-text"
                value={updatedContent}
                onChange={(e) => setUpdatedContent(e.target.value)}
              ></textarea>
            </div>
          </form>

          {mediaUrl && (
            <div className="mb-3">
              {type === "video" ? (
                <video className=" h-3/4 rounded" controls autoPlay muted loop>
                  <source src={mediaUrl} />
                </video>
              ) : (
                <img className=" rounded" src={mediaUrl} alt="Preview" />
              )}
            </div>
          )}
        </div>

        <div className="modal-footer flex justify-end gap-3">
          <button
            type="submit"
            onClick={postEditHandle}
            className="bg-[#39A7F2] px-4 font-bold mx-5 text-sm rounded-full py-2  text-white"
          >
            Update
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
