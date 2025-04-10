import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from './components/Layout/userLayout';
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

const App = () => {
  return (
    <BrowserRouter>
    <Toaster position="top-right" />  
      <Routes>
        <Route path="/" element={<UserLayout/>}>
        <Route index element={<Home/>}/>
        <Route path="login" element={<LoginPage/>}/>
        <Route path="register" element={<Register/>}/>
        <Route path="profile" element={<Profile/>}/>
        <Route path="collection/:collection" element={<CollectionPage/>}/>
        <Route path="product/:id" element={<ProductDetails/>}/>
        <Route path="checkout" element={<CheckOut/>}/>
        <Route path="order-confirmation" element={<OrderConfirmation/>}/>
        <Route path="order/:id" element={<OrderDetailsPage/>}/>
        <Route path="my-orders" element={<MyOrdersPage/>}/>
        </Route>
        <Route>
        {/* admin layout */}
        <Route path="/admin-panel" element={<AdminLayout/>}>
        <Route index element={<AdminHomePage/>}/>
        </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
