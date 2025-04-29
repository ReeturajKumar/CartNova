const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// chek user is authenticate 
const protectRouter = async (req, res, next) => {
  let token;

  // Check if the authorization header contains a Bearer token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];  // Get the token from the header

      // Verify the token using the JWT secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user by ID and attach user info to the request object
      req.user = await User.findById(decoded.user.id).select("-password");

      // If user not found, respond with unauthorized error
      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      console.error("Token verification failed:", error);

      // Check for specific error type (expired token)
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: "Token expired, please log in again" });
      }

      // Handle any other token verification errors
      return res.status(401).json({ message: "Not authorized, invalid token" });
    }
  }

  // If no token is provided in the authorization header
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token provided" });
  }
};


// check the role of user 
const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403);
    throw new Error("Not authorized as an admin");
  }
};

module.exports = { protectRouter,admin };