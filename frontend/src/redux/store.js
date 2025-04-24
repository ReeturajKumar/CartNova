import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import productsReducer from "./slice/productsSlice";
import cartReducer from "./slice/cartSLice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products:productsReducer,
    cart:cartReducer
  },
});

export default store;