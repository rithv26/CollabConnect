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

router.get("/location", searchUsersByLocation);
router.get("/remote", searchRemoteUsers);
router.get("/globe", getAllUserLocations);
router.post("/", addUser);
router.route("/:auth0Id").
    get(getUserByAuth0Id).
    put(updateUserByAuth0Id);

module.exports = router;