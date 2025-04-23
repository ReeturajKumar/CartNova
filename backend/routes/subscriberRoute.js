const express = require("express");
const { handlNewsletter } = require("../controllers/subscriberController");

const router = express.Router();

router.post("/subscribe-email", handlNewsletter )

module.exports = router;