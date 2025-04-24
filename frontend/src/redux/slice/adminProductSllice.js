import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


// fetch admin products
export const fetchAdminProducts = createAsyncThunk("admin/fetchAdminProducts", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/products/all-products`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("userToken"),
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// add the product action
export const addProduct = createAsyncThunk("admin/addProduct", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/products/create-product`, data, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("userToken"),
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});


// update the product action
export const updateProduct = createAsyncThunk("admin/updateProduct", async ({id,data}, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/products/update-product/${id}`, data, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("userToken"),
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});



// delete the product action
export const deleteProduct = createAsyncThunk("admin/deleteProduct", async (id) => {  
  await axios.delete(`${import.meta.env.VITE_BASE_URL}/products/delete-product/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("userToken"),
      },
    });
    return id
  } 
);


const adminProductSlice = createSlice({
  name: "adminProduct",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchAdminProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload.product);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex((product) => product._id === action.payload._id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((product) => product._id !== action.payload);
      });
  },
});

export default adminProductSlice.reducer;