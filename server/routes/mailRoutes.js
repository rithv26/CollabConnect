const express = require("express");
const router = express.Router();
const sendEmail = require("../controllers/mailController");

router.post("/", sendEmail);

module.exports = router;