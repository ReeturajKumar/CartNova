import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for fetching products with filters
export const fetchProductsByFilters = createAsyncThunk(
  "products/fetchByFilters",
  async ({
    collection, size, color, gender, minPrice, maxPrice, sortBy,
    search, category, material, brand, limit
  }) => {
    const query = new URLSearchParams();

    if (collection !== undefined && collection !== null) query.append("collection", collection);
    if (size !== undefined && size !== null) query.append("size", size);
    if (color !== undefined && color !== null) query.append("color", color);
    if (gender !== undefined && gender !== null) query.append("gender", gender);
    if (minPrice !== undefined && minPrice !== null) query.append("minPrice", minPrice);
    if (maxPrice !== undefined && maxPrice !== null) query.append("maxPrice", maxPrice);
    if (sortBy !== undefined && sortBy !== null) query.append("sortBy", sortBy);
    if (search !== undefined && search !== null) query.append("search", search);
    if (category !== undefined && category !== null) query.append("category", category);
    if (material !== undefined && material !== null) query.append("material", material);
    if (brand !== undefined && brand !== null) query.append("brand", brand);
    if (limit !== undefined && limit !== null) query.append("limit", limit);

    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/products?${query.toString()}`);
    return response.data;
  }
);

// Fetch single product details
export const fetchProductDetails = createAsyncThunk("products/fetchProductDetails", async (id) => {
  const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/products/${id}`);
  return response.data;
});

// Update product
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ productData, id }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_BASE_URL}/products/update-product/${id}`,
      productData,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("userToken"),
        },
      }
    );
    return response.data;
  }
);

// Fetch similar products
export const fetchSimilarProducts = createAsyncThunk("products/fetchSimilarProducts", async ({ id }) => {
  const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/products/similar-products/${id}`);
  return response.data;
});

export const submitReview = createAsyncThunk(
  "products/submitReview",
  async (reviewData, { rejectWithValue }) => {
    try {
      return reviewData;
    } catch (error) {
      return rejectWithValue("Something went wrong!");
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    selectedProduct: null,
    similarProducts: [],
    loading: false,
    error: null,
    filters: {
      category: "",
      size: "",
      color: "",
      gender: "",
      material: "",
      brand: "",
      minPrice: "",
      maxPrice: "",
      sortBy: "",
      search: "",
      collection: "",
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },
    clearFilters: (state) => {
      state.filters = {
        category: "",
        size: "",
        color: "",
        gender: "",
        material: "",
        brand: "",
        minPrice: "",
        maxPrice: "",
        sortBy: "",
        search: "",
        collection: "",
      };
    },
    resetProductState: (state) => {
      state.selectedProduct = null;
      state.similarProducts = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.products = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchProductsByFilters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchSimilarProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.similarProducts = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchSimilarProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProduct = action.payload;
        const index = state.products.findIndex((product) => product._id === updatedProduct._id);
        if (index !== -1) {
          state.products[index] = updatedProduct;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(submitReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitReview.fulfilled, (state, action) => {
        state.loading = false;
        if (state.selectedProduct && state.selectedProduct.reviews) {
          state.selectedProduct.reviews.push(action.payload);
        }
      })
      .addCase(submitReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilters, clearFilters, resetProductState } = productsSlice.actions;
export default productsSlice.reducer;
