import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


// create checkout session
export const createCheckOutSession = createAsyncThunk(
  "checkout/createCheckOutSession",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/checkout/check-out`,
        data,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("userToken"),
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    checkout: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCheckOutSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCheckOutSession.fulfilled, (state, action) => {
        state.loading = false;
        state.checkout = action.payload;
      })
      .addCase(createCheckOutSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.messsage;
      })
  },
});

export default checkoutSlice.reducer;