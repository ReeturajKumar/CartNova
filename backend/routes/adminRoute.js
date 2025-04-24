const express = require("express");
const { getAllUsers, addNewUser, updateUser, deleteUser } = require("../controllers/adminController");
const { protectRouter, admin } = require("../middleware/authMiddleware");


const router = express.Router();

router.get("/all-users",protectRouter,admin, getAllUsers);
router.post("/add-user",protectRouter,admin, addNewUser);
router.put("/update-user/:id",protectRouter,admin, updateUser);
router.delete("/:id",protectRouter,admin, deleteUser);


module.exports = router;