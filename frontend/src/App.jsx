import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from './components/Layout/userLayout';
import Home from "./pages/Home";
import { Toaster } from "sonner";
import LoginPage from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  return (
    <BrowserRouter>
    <Toaster position="top-right" />  
      <Routes>
        <Route path="/" element={<UserLayout/>}>
        <Route index element={<Home/>}/>
        <Route path="login" element={<LoginPage/>}/>
        <Route path="register" element={<Register/>}/>
        </Route>
        <Route>
        {/* admin layout */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
