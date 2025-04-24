const User = require("../models/userModel");



// get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// add new user
const addNewUser = async (req, res) => {
  const {name, email,password,role} = req.body
  try {
    let user = await User.findOne({email});
    if(user){
      return res.status(400).json({ message: "User already exists" });
    }

    user = new User({name,email,password,role:role || "customer"});
    await user.save();
    res.status(201).json(user, { message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// update user details 
const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if(user){
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.role = req.body.role || user.role;
    }
    const updatedUser = await user.save();
    res.status(200).json(updatedUser, { message: "User updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}


// delete user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if(user){
      await user.deleteOne();
      res.status(200).json({ message: "User deleted successfully" });
    }else{
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}



module.exports = {
  getAllUsers,
  addNewUser,
  updateUser,
  deleteUser
};