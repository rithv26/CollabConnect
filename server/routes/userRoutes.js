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


router.get("/location", jwtCheck, zodValidate(userValidationSchema), searchUsersByLocation);
router.get("/remote", jwtCheck, zodValidate(userValidationSchema), searchRemoteUsers);
router.get("/globe", getAllUserLocations);
router.post("/", jwtCheck, zodValidate(userValidationSchema), addUser);
router.route("/:auth0Id").
    all(jwtCheck).
    get(getUserByAuth0Id).
    put(updateUserByAuth0Id)
    .delete(deleteUser);

module.exports = router;