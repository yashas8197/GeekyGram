import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get("https://quack-be.vercel.app/api/v1/posts");

  return response.data;
});

export const fetchPostById = createAsyncThunk(
  "posts/fetchPostById",
  async (postId) => {
    const response = await axios.get(
      `https://quack-be.vercel.app/api/v1/post/${postId}`
    );
    return response.data;
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ postId, updateData }) => {
    const response = await axios.post(
      `https://quack-be.vercel.app/api/v1/post/${postId}`,
      updateData
    );

    return response.data;
  }
);

export const commentPost = createAsyncThunk(
  "posts/commentPost",
  async ({ postId, dataToUpdate }) => {
    const response = await axios.post(
      `https://quack-be.vercel.app/api/v1/comment/${postId}`,
      dataToUpdate
    );

    console.log(response.data);

    return response.data;
  }
);

export const likePost = createAsyncThunk(
  "posts/likePost",
  async ({ postId, dataToUpdate }) => {
    const response = await axios.post(
      `https://quack-be.vercel.app/api/v1/like/${postId}`,
      dataToUpdate
    );

    return response.data;
  }
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async ({ dataToUpload }) => {
    const response = await axios.post(
      `https://quack-be.vercel.app/api/v1/post`,
      dataToUpload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }
);

export const editPostApi = createAsyncThunk(
  "posts/editPostApi",
  async ({ id, dataToUpdate }) => {
    const response = await axios.post(
      `https://quack-be.vercel.app/api/v1/edit/${id}`,
      dataToUpdate
    );
    return response.data;
  }
);

export const editPostAvatar = createAsyncThunk(
  "posts/editPostAvatar",
  async ({ username, dataToUpdate }) => {
    const response = await axios.post(
      `https://quack-be.vercel.app/api/post/edit/${username}`,
      dataToUpdate
    );
    return response.data;
  }
);

export const deletePostApi = createAsyncThunk(
  "posts/deletePost",
  async (id) => {
    const response = await axios.delete(
      `https://quack-be.vercel.app/api/user/delete/${id}`
    );
    return id;
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    currentPost: null,
    editPost: {},
    status: "idle",
    error: null,
  },
  reducers: {
    resetCurrentPost: (state) => {
      state.currentPost = null;
    },
    setPost: (state, action) => {
      state.editPost = action.payload;
    },
    likeThePost: (state, action) => {
      const { postId, username } = action.payload;
      state.posts = state.posts.map((post) => {
        if (post._id === postId) {
          const hasLiked = post.likes.likedBy.findIndex(
            (user) => user.username === username
          );
          if (hasLiked !== -1) {
            return {
              ...post,
              likes: {
                likeCount: post.likes.likeCount - 1,
                likedBy: post.likes.likedBy.filter((user) => user !== username),
              },
            };
          } else {
            return {
              ...post,
              likes: {
                likeCount: post.likes.likeCount + 1,
                likedBy: [...post.likes.likedBy, username],
              },
            };
          }
        }
        return post;
      });
    },
  },
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.status = "loading";
    };

    const handleFulfilled = (state, action) => {
      state.status = "fulfilled";
    };

    const handleRejected = (state, action) => {
      state.status = "rejected";
      state.error = action.error.message || "Something went wrong";
    };

    builder.addCase(fetchPosts.pending, handlePending);
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      handleFulfilled(state);
      state.posts = action.payload.posts;
    });
    builder.addCase(fetchPosts.rejected, handleRejected);

    builder.addCase(updatePost.pending, handlePending);
    builder.addCase(updatePost.fulfilled, (state, action) => {
      handleFulfilled(state);
      const updatedPost = action.payload.post;
      state.posts = state.posts.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      );
    });
    builder.addCase(updatePost.rejected, handleRejected);

    builder.addCase(fetchPostById.pending, handlePending);
    builder.addCase(fetchPostById.fulfilled, (state, action) => {
      handleFulfilled(state);
      state.currentPost = action.payload.post;
    });
    builder.addCase(fetchPostById.rejected, handleRejected);

    builder.addCase(createPost.pending, handlePending);
    builder.addCase(createPost.fulfilled, (state, action) => {
      handleFulfilled(state);
      const newPost = action.payload;
      state.posts = [...state.posts, newPost];
    });
    builder.addCase(createPost.rejected, handleRejected);

    builder.addCase(likePost.pending, handlePending);
    builder.addCase(likePost.fulfilled, (state, action) => {
      handleFulfilled(state);
      const updatedPost = action.payload;
      state.posts = state.posts.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      );
    });
    builder.addCase(likePost.rejected, handleRejected);

    builder.addCase(commentPost.pending, handlePending);
    builder.addCase(commentPost.fulfilled, (state, action) => {
      handleFulfilled(state);
      const updatedPost = action.payload;
      state.posts = state.posts.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      );
    });
    builder.addCase(commentPost.rejected, handleRejected);

    builder.addCase(editPostApi.pending, handlePending);
    builder.addCase(editPostApi.fulfilled, (state, action) => {
      handleFulfilled(state);
      const updatedPost = action.payload?.post;

      if (updatedPost) {
        state.editPost = updatedPost;
        state.posts = state.posts.map((post) =>
          post._id === updatedPost._id ? { ...post, ...updatedPost } : post
        );
      }
    });

    builder.addCase(editPostApi.rejected, handleRejected);

    builder.addCase(deletePostApi.pending, handlePending);
    builder.addCase(deletePostApi.fulfilled, (state, action) => {
      handleFulfilled(state);
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    });
    builder.addCase(deletePostApi.rejected, handleRejected);

    builder.addCase(editPostAvatar.pending, handlePending);
    builder.addCase(editPostAvatar.fulfilled, (state, action) => {
      handleFulfilled(state);
      const updatedPost = action.payload.post;
      state.posts = state.posts.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      );
    });
    builder.addCase(editPostAvatar.rejected, handleRejected);
  },
});

export const { resetCurrentPost, setPost, editedPost, likeThePost } =
  postSlice.actions;

export default postSlice.reducer;
