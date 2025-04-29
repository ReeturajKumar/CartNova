import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


// fetcging all orders for user
export const fetchUserOrders = createAsyncThunk("order/fetchUserOrders", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/orders/my-orders`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("userToken"),
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// fetching details of order
export const fetchOrderDetails = createAsyncThunk("order/fetchOrderDetails", async (orderId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/orders/my-orders/${orderId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("userToken"),
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});


const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    totalOrders: 0,
    orderDetails: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      .addCase(fetchOrderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = action.payload;
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
  },
})

export default orderSlice.reducer