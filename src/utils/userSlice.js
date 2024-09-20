import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserByUsername = createAsyncThunk(
  "user/fetchUserByUsername",
  async (username) => {
    const response = await axios.get(
      `https://quack-be.vercel.app/api/v1/users/${username}`
    );
    return response.data;
  }
);

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  const response = await axios.get("https://quack-be.vercel.app/api/v1/users");
  return response.data;
});

export const updateUserFollowing = createAsyncThunk(
  "user/updateUserFollowing",
  async ({ id, dataToUpdate }) => {
    const response = await axios.post(
      `https://quack-be.vercel.app/api/v1/following/${id}`,
      dataToUpdate
    );

    return response.data;
  }
);

export const updateUserFollowers = createAsyncThunk(
  "user/updateUserFollowers",
  async ({ id, dataToUpdate }) => {
    const response = await axios.post(
      `https://quack-be.vercel.app/api/v1/followers/${id}`,
      dataToUpdate
    );

    return response.data;
  }
);

export const unFollowUser = createAsyncThunk(
  "user/unFollowUser",
  async ({ userId, followId }) => {
    const response = await axios.post(
      `https://quack-be.vercel.app/api/v1/unfollow/${userId}/${followId}`
    );

    console.log(response.data);
    return response.data;
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async ({ userId, dataToUpdate }) => {
    const response = await axios.post(
      `https://quack-be.vercel.app/api/v1/profile/${userId}`,
      dataToUpdate
    );

    return response.data;
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    usersList: [],
    user: null,
    ownerUserData: {
      _id: "66cf5b279f160ce5ef57dcd1",
      firstName: "Katherine",
      lastName: "Brundage",
      username: "Katherine",
      password: "Katherine",
      avatarURL:
        "https://res.cloudinary.com/darwtgzlk/image/upload/w_400,f_auto,q_auto/v1686251367/socialMedia/profilePictures/user1_wla0x2.jpg",
      bio: "Proud cat lover. Meow .😺🙀😽😼",
      website: "https://peerlist.io/yashasv",
      following: [
        {
          firstName: "Neha",
          lastName: "Dung",
          username: "Neha",
          avatarURL:
            "https://res.cloudinary.com/darwtgzlk/image/upload/w_400,f_auto,q_auto/v1686251365/socialMedia/profilePictures/user4_yobn9s.jpg",
          _id: "66cf5b279f160ce5ef57dcd2",
        },
        {
          firstName: "Beverly",
          lastName: "Myles",
          username: "Beverly",
          avatarURL:
            "https://res.cloudinary.com/darwtgzlk/image/upload/w_400,f_auto,q_auto/v1686251364/socialMedia/profilePictures/user2_dhebgg.jpg",
          _id: "66d84cedc2442e1fa8bab494",
        },
        {
          firstName: "Malik",
          lastName: "Williams",
          username: "Malik",
          avatarURL:
            "https://res.cloudinary.com/darwtgzlk/image/upload/w_400,f_auto,q_auto/v1686251368/socialMedia/profilePictures/user3_atvsaj.jpg",
          _id: "66e4168ba7222d975eafaa14",
        },
      ],
      followers: [
        {
          firstName: "Neha",
          lastName: "Dung",
          username: "Neha",
          avatarURL:
            "https://res.cloudinary.com/darwtgzlk/image/upload/w_400,f_auto,q_auto/v1686251365/socialMedia/profilePictures/user4_yobn9s.jpg",
          _id: "66cf5b279f160ce5ef57dcd4",
        },
        {
          firstName: "Josh",
          lastName: "Tate",
          username: "Josh",
          avatarURL:
            "https://res.cloudinary.com/darwtgzlk/image/upload/w_400,f_auto,q_auto/v1686251365/socialMedia/profilePictures/user10_dmlsg2.jpg",
          _id: "66cf5b279f160ce5ef57dcd5",
        },
      ],
      __v: 98,
      updatedAt: "2024-09-13T10:40:11.373Z",
    },
    status: "idle",
    error: null,
  },
  reducers: {
    clearUser: (state) => {
      state.user = null;
    },
    addFollowing: (state, action) => {
      const { userId, newFollowRequest } = action.payload;

      const userToUpdate = state.usersList.find((user) => user._id === userId);
      if (userToUpdate) {
        userToUpdate.following = [...userToUpdate.following, newFollowRequest];
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserByUsername.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchUserByUsername.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.user = action.payload.user;
    });
    builder.addCase(fetchUserByUsername.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.error.message;
    });

    builder.addCase(updateUserProfile.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      state.status = "fulfilled";
      const userUpdate = action.payload.user;
      state.user = userUpdate;
    });
    builder.addCase(updateUserProfile.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.error.message;
    });

    builder.addCase(fetchUsers.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.usersList = action.payload.users;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.error.message;
    });

    builder.addCase(updateUserFollowing.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateUserFollowing.fulfilled, (state, action) => {
      state.status = "fulfilled";
      const updatedUser = action.payload.user;
      const index = state.usersList.findIndex(
        (user) => user._id === updatedUser._id
      );
      if (index !== -1) {
        state.usersList[index] = updatedUser;
      }
      if (state.user && state.user._id === updatedUser._id) {
        state.user = updatedUser;
      }
    });
    builder.addCase(updateUserFollowing.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.error.message;
    });

    builder.addCase(updateUserFollowers.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateUserFollowers.fulfilled, (state, action) => {
      state.status = "fulfilled";
      const updatedUser = action.payload.user;
      const index = state.usersList.findIndex(
        (user) => user._id === updatedUser._id
      );
      if (index !== -1) {
        state.usersList[index] = updatedUser;
      }
      if (state.user && state.user._id === updatedUser._id) {
        state.user = updatedUser;
      }
    });
    builder.addCase(updateUserFollowers.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.error.message;
    });
  },
});

export const { clearUser, addFollowing, unFollow } = userSlice.actions;

export default userSlice.reducer;
