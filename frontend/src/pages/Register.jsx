import React, { useEffect, useState } from "react";
import { FaFacebookF, FaGoogle, FaApple } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import img1 from "../assets/L2.avif";
import { register } from "../redux/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { mergeCart } from "../redux/slice/cartSlice";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, guestId, loading, error } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  const isCheckoutRedirect = redirect.includes("/checkout");

  useEffect(() => {
    // On successful registration
    if (user) {
      toast.success("Register successfully");
      if (cart?.products.length > 0 && guestId) {
        dispatch(mergeCart({ guestId, user })).then(() => {
          navigate(isCheckoutRedirect ? "/checkout" : redirect);
        });
      } else {
        navigate(isCheckoutRedirect ? "/checkout" : redirect);
      }
    }
  }, [user, guestId, cart, dispatch, navigate, isCheckoutRedirect, redirect]);

useEffect(() => {
  if (error) {
    // error is expected to be an object like { error: "Invalid email" } or { error: "User already exists" }
    if (error.error === "User already exists") {
      toast.error("User already exists, please try to login");
    } else if (error.error === "Invalid email") {
      toast.error("Invalid email");
    } else {
      toast.error("Registration failed. Please try again.");
    }
  }
}, [error]);


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ name, email, password }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-16">
      <div className="bg-white rounded-3xl shadow-sm w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 overflow-hidden items-center">
        {/* Left: Illustration */}
        <div className=" hidden md:flex items-center justify-center p-0 overflow-hidden h-full">
          <img
            src={img1}
            className="h-full w-full object-cover"
            alt="Signup illustration"
          />
        </div>

        {/* Right: Sign Up Form */}
        <div className="p-10 flex flex-col justify-center h-full">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Create Your Account</h1>
            <p className="text-gray-500">
              Join our community and start your shopping experience with
              personalized deals, order tracking, and more!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
            />
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition duration-300 hover:text-white cursor-pointer"
            >
              {loading ? "Loading..." : "Create account"}
            </button>

            <p className="text-center text-sm">
              Already have an account?{" "}
              <Link
                to={`/login?redirect=${encodeURIComponent(redirect)}`}
                className="text-slate-950 font-medium hover:underline"
              >
                Login
              </Link>
            </p>
          </form>

          <div className="my-6 flex items-center">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-4 text-gray-400 text-sm">Or Sign up with</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <div className="flex gap-4 justify-center">
            <button className="p-3 border rounded-lg hover:cursor-not-allowed opacity-50">
              <FaFacebookF className="text-gray-900" />
            </button>
            <button className="p-3 border rounded-lg hover:cursor-not-allowed opacity-50">
              <FaGoogle className="text-gray-900" />
            </button>
            <button className="p-3 border rounded-lg hover:cursor-not-allowed opacity-50">
              <FaApple className="text-gray-900" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
