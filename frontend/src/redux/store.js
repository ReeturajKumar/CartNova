import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import productsReducer from "./slice/productsSlice";
import cartReducer from "./slice/cartSLice";
import cheeckoutReducer from "./slice/checkOutSlice";
import orderReducer from "./slice/orderSlice";
import adminReducer from "./slice/adminSlice";
import adminProductReducer from "./slice/adminProductSllice";
import adminOrderReducer from "./slice/adminOrderSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products:productsReducer,
    cart:cartReducer,
    checkout: cheeckoutReducer,
    order: orderReducer,
    admin: adminReducer,
    adminProduct: adminProductReducer,
    adminOrder: adminOrderReducer
  },
});

export default store;