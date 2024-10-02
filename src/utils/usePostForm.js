import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "./postSlice";

const usePostForm = (initialFormState) => {
  const [postForm, setPostForm] = useState(initialFormState);
  const dispatch = useDispatch();

  const handleUpload = (file) => {
    setPostForm((prev) => ({
      ...prev,
      mediaUrl: file,
      type: file?.type.includes("image/") ? "image" : "video",
    }));
  };

  const handleChange = (e) => {
    setPostForm((prev) => ({
      ...prev,
      content: e.target.value,
    }));
  };

  const resetForm = () => {
    setPostForm(initialFormState);
  };

  const handleSubmit = (e, resetForm) => {
    e.preventDefault();
    // Create FormData to handle file upload and other required data
    const formData = new FormData();
    formData.append("content", postForm.content); // Append content
    if (postForm.mediaUrl) {
      formData.append("mediaUrl", postForm.mediaUrl); // Append media file if available
    }

    // Append other required fields
    formData.append("username", postForm.username);
    formData.append("firstName", postForm.firstName);
    formData.append("lastName", postForm.lastName);
    formData.append("avatarURL", postForm.avatarURL);
    formData.append("type", postForm.type);

    dispatch(createPost({ dataToUpload: formData }));
    resetForm();
  };

  return {
    postForm,
    handleUpload,
    handleChange,
    handleSubmit,
    resetForm,
  };
};

export default usePostForm;
