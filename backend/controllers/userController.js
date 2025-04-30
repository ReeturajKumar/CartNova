const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// user registration controller
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).send({ error: "User already exists" });
    }

    user = await User.create({ name, email, password });

    const payload = { user: { id: user._id, role: user.role } };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' }, (err, token) => {
      if (err) throw err;

      res.status(201).json({
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        },
        token,
        message: "User created successfully"
      });
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

// user login controller
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ error: "Invalid Credentials" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).send({ error: "Invalid Credentials" });
    }

    const payload = { user: { id: user._id, role: user.role } };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;

      res.json({
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        },
        token,
        message: "User logged in successfully"
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

// user profile controller
const userProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
}


module.exports = {
  registerUser,
  loginUser,
  userProfile,
};
