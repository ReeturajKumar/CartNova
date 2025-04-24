import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import productsReducer from "./slice/productsSlice";
import cartReducer from "./slice/cartSLice";
import cheeckoutReducer from "./slice/checkOutSlice";
import orderReducer from "./slice/orderSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products:productsReducer,
    cart:cartReducer,
    checkout: cheeckoutReducer,
    order: orderReducer
  },
});

export default store;