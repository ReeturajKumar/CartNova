import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./components/Layout/userLayout";
import Home from "./pages/Home";
import { Toaster } from "sonner";
import LoginPage from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CollectionPage from "./pages/CollectionPage";
import ProductDetails from "./components/Products/ProductDetails";
import CheckOut from "./components/Cart/CheckOut";
import OrderConfirmation from "./pages/OrderConfirmation";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import AdminLayout from "./components/Admin/AdminLayout";
import AdminHomePage from "./pages/AdminHomePage";
import UserManagement from "./components/Admin/UserManagement";
import ProductManagemnt from "./components/Admin/ProductManagemnt";
import EditProductPage from "./components/Admin/EditProductPage";
import OrderManagement from "./components/Admin/OrderManagement";

import { Provider } from "react-redux";
import store from "./redux/store";
import ProtectedRoute from "./components/Common/ProtectedRoute";
import Chatbot from "./components/Chatbot/Chatbot";
import ProductCreationForm from "./components/Admin/ProductCreationForm";


const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<Profile />} />
            <Route path="collection/:collection" element={<CollectionPage />} />
            <Route path="product/:id" element={<ProductDetails />} />
            <Route path="checkout" element={<CheckOut />} />
            <Route path="order-confirmation" element={<OrderConfirmation />} />
            <Route path="order/:id" element={<OrderDetailsPage />} />
            <Route path="my-orders" element={<MyOrdersPage />} />
          </Route>
          <Route>
            {/* admin layout */}
            <Route path="/admin-panel" element={<ProtectedRoute role={"admin"}><AdminLayout /></ProtectedRoute>}>
              <Route index element={<AdminHomePage />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="products" element={<ProductManagemnt />} />
              <Route path="products/:id/edit" element={<EditProductPage />} />
              <Route path="orders" element={<OrderManagement />} />
              <Route path="products/product-creation" element={<ProductCreationForm />} />
            </Route>
          </Route>
        </Routes>
        <Chatbot />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
