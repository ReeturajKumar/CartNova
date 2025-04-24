import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


// fetch all users
export const fetchAllUsers = createAsyncThunk("admin/fetchAllUsers", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/users/all-users`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("userToken"),
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});


// add the user action
export const addUser = createAsyncThunk("admin/addUser", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/users/add-user`, data, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("userToken"),
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});


// update user info
export const updateUser = createAsyncThunk("admin/updateUser", async ({id,name,email,role}, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/admin/users/update-user/${id}`, {name,email,role}, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("userToken"),
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// delete user
export const deleteUser = createAsyncThunk("admin/deleteUser", async (id) => {
  await axios.delete(`${import.meta.env.VITE_BASE_URL}/admin/users/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("userToken"),
      },
    });
    return id
  } 
);



const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload.user);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const updatedUser = action.payload;  
        const userIndex = state.users.findIndex((user) => user._id === updatedUser._id);
        if (userIndex !== -1) {
          state.users[userIndex] = updatedUser;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload);
      });
  },
});

export default adminSlice.reducer;