import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


// fetch all order for admin
export const fetchAdminOrders = createAsyncThunk("admin/fetchAdminOrders", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/orders/all-orders`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("userToken"),
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// update the order action
export const updateOrder = createAsyncThunk("admin/updateOrder", async ({id,data}, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/admin/orders/update-status/${id}`, data, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("userToken"),
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});



// delete the order action
export const deleteOrder = createAsyncThunk("admin/deleteOrder", async (id) => {  
  await axios.delete(`${import.meta.env.VITE_BASE_URL}/admin/orders/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("userToken"),
      },
    });
    return id
  } 
);



const adminOrderSlice = createSlice({
  name: "adminOrder",
  initialState: {
    orders: [],
    totalOrders: 0,
    totalSales: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.totalOrders = action.payload.length;
        
        const totalSales = action.payload.reduce((acc, order) => {
          return acc + order.totalPrice;
        }, 0);

        state.totalSales = totalSales;
      })
      .addCase(fetchAdminOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(updateOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        const updatedOrder = action.payload;
        const orderindex = state.orders.findIndex((order) => order._id === updatedOrder._id);
        if (orderindex !== -1) {
          state.orders[orderindex] = updatedOrder;
        }
        state.loading = false;
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter((order) => order._id !== action.payload);
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
  })

export default adminOrderSlice.reducer;