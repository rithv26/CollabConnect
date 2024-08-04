const express = require("express");
const router = express.Router();
const {
  addUser,
  getUserByAuth0Id,
  updateUserByAuth0Id,
  searchRemoteUsers,
  searchUsersByLocation,
  getAllUserLocations,
} = require("../controllers/userController");
const jwtCheck = require('../middleware/checkJWT');



router.get("/location", jwtCheck, searchUsersByLocation);
router.get("/remote", jwtCheck, searchRemoteUsers);
router.get("/globe", getAllUserLocations);
router.post("/", jwtCheck, addUser);
router.route("/:auth0Id").
    all(jwtCheck).
    get(getUserByAuth0Id).
    put(updateUserByAuth0Id);

module.exports = router;