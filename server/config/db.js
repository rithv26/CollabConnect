const mongoose = require("mongoose");
const User = require("../models/User");

const connectToDB = async () => {
  const mongodbURL = process.env.MONGO_URI;
  try {
    await mongoose.connect(mongodbURL);
    console.log("Mongodb has been connected successfully");
  } catch (error) {
    console.log(`Error connecting to mongodb ${error}`);
  }
};

module.exports = connectToDB;
