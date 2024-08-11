const express = require("express");
const router = express.Router();
const sendEmail = require("../controllers/mailController");
const zodValidate = require('../middleware/zodValidate');
const mailValidationSchema = require('../models/mailValidationSchema');
const jwtcheck = require('../middleware/checkJWT');

router.post("/", jwtcheck, zodValidate(mailValidationSchema), sendEmail);

module.exports = router;