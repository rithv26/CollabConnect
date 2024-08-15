const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    auth0Id: {
      type: String,
      unique: true,
      default: ""
    },
    name: {
      type: String,
      default: "Anonymous",
    },
    email: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    profileCompleted: {
      type: Boolean,
      default: false,
    },
    isHacker: {
      type: Boolean,
      default: false,
    },
    isDeveloper: {
      type: Boolean,
      default: false,
    },
    isResearcher: {
      type: Boolean,
      default: false,
    },
    timezone: {
      type: String,
      default: "UTC",
    },
    location: {
      type: {
        type: String,
        default: "Point",
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
        default: [0, 0],
      },
    },
    previousHackathons: {
      type: [String],
      default: [],
    },
    devpostProfile: {
      type: String,
      default: "",
    },
    researchProfile: {
      type: String,
      default: "",
    },
    githubUsername: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.index({ location: "2dsphere" });

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;