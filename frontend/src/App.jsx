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
        </Route>
        <Route>
        {/* admin layout */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
