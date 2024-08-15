const express = require("express");
const router = express.Router();
const {
  addUser,
  getUserByAuth0Id,
  updateUserByAuth0Id,
  searchRemoteUsers,
  searchUsersByLocation,
  getAllUserLocations,
  deleteUser
} = require("../controllers/userController");
const jwtCheck = require('../middleware/checkJWT');
const zodValidate = require('../middleware/zodValidate');
const userValidationSchema = require('../models/userValidationSchema');


router.get("/location", jwtCheck, searchUsersByLocation);
router.get("/remote", jwtCheck, searchRemoteUsers);
router.get("/globe", getAllUserLocations);
router.post("/", zodValidate(userValidationSchema), addUser);

//auth0ID handling
router.get("/:auth0Id", jwtCheck, getUserByAuth0Id);
router.put("/:auth0Id", jwtCheck, zodValidate(userValidationSchema), updateUserByAuth0Id);
router.delete("/:auth0Id", deleteUser);

module.exports = router;