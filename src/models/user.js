const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50,
  },
  lastName: {
    type: String,
    trim: true,
    maxlength: 50,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: /^\S+@\S+\.\S+$/,   // basic email validation
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 128,
    match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/, // strong password check
  },
  age: {
    type: Number,
    min: 13,
    max: 120,
  },
  gender: {
    type: String,
    enum: ["male", "female", "others"], // only allow fixed values
  },
  photoUrl: {
    type: String,
    match: /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i, // must be a valid image url
  },
  about: {
    type: String,
    trim: true,
    default: "This is a default about of a user",
    maxlength: 500,
  },
  skills: {
    type: [String],
    validate: {
      validator: (arr) => arr.length <= 20,
      message: "Skills cannot exceed 20 items",
    },
  },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
