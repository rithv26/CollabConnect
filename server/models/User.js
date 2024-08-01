const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema(
  {
    auth0Id: {
      type: String,
      unique: true,
      default: "",
      required: [true, "Auth0 ID is required"],
    },
    name: {
      type: String,
      default: "Anonymous",
    },
    email: {
      type: String,
      unique: true,
      default: "",
      validate: {
        validator: (value) => validator.isEmail(value) || value === "",
        message: "Please enter a valid email address.",
      },
    },
    description: {
      type: String,
      default: "",
      validate: {
        validator: (value) => validator.isLength(value, { max: 500 }),
        message: "Description must be less than 500 characters.",
      },
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
        validate: {
          validator: (value) =>
            Array.isArray(value) &&
            value.length === 2 &&
            validator.isFloat(value[0].toString()) &&
            validator.isFloat(value[1].toString()),
          message:
            "Coordinates must be an array of two numbers (longitude, latitude).",
        },
      },
    },
    previousHackathons: {
      type: [String],
      default: [],
      validate: {
        validator: (value) => Array.isArray(value),
        message: "Previous hackathons must be an array of strings.",
      },
    },
    devpostProfile: {
      type: String,
      default: "",
      validate: {
        validator: (value) => validator.isURL(value) || value === "",
        message: "Please enter a valid URL for the Devpost profile.",
      },
    },
    researchProfile: {
      type: String,
      default: "",
      validate: {
        validator: (value) => validator.isURL(value) || value === "",
        message: "Please enter a valid URL for the research profile.",
      },
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
