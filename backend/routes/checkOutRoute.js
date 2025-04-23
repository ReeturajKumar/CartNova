const express = require("express");
const { protectRouter} = require("../middleware/authMiddleware");
const { createCheckOutSession, updateCheckOutSession, finalizeCheckOutSession } = require("../controllers/checkOutController");


const router = express.Router();

router.post("/check-out", protectRouter, createCheckOutSession);
router.put("/update-status/:id/payment",protectRouter, updateCheckOutSession);
router.post("/update-status/:id/finalize",protectRouter, finalizeCheckOutSession);

module.exports = router;