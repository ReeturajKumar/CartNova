import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import productsReducer from "./slice/productsSlice";
import cartReducer from "./slice/cartSLice";
import cheeckoutReducer from "./slice/checkOutSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products:productsReducer,
    cart:cartReducer,
    checkout: cheeckoutReducer
  },
});

export default store;