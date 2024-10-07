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

const CreatePostForm = () => {
  const { postForm, handleUpload, handleChange, handleSubmit, resetForm } =
    usePostForm(initialFormState);

  const handleMediaInput = (e) => {
    const file = e.target.files[0];
    if (file?.type.startsWith("image/") || file.type.startsWith("video/")) {
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
    <div className="whatishapp flex gap-4 border-[1px] border-y-gray-800 p-5 rounded-2xl">
      <div className="img m-2 w-16">
        <img
          className="mr-3 w-12 h-12 rounded-full object-cover"
          src="https://res.cloudinary.com/darwtgzlk/image/upload/w_400,f_auto,q_auto/v1686251367/socialMedia/profilePictures/user1_wla0x2.jpg"
        />
      </div>
      <div className="w-full">
        <form action="/api/v1/post" method="POST" encType="multipart/form-data">
          <input
            value={postForm.content}
            onChange={handleChange}
            className="w-full h-7 my-5 text-xl bg-black outline-none text-white "
            placeholder="what is happening?!"
          />
          <div>
            {postForm.mediaUrl && (
              <div className="mb-3 h-1/2 relative">
                {postForm.mediaUrl.type === "video/mp4" ? (
                  <video
                    className="w-full h-full object-cover rounded"
                    controls
                    autoPlay
                    muted
                    loop
                  >
                    <source src={URL.createObjectURL(postForm.mediaUrl)} />
                  </video>
                ) : (
                  <img
                    className="w-full h-full object-cover rounded"
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

            <div className="flex justify-between items-center">
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostForm;
