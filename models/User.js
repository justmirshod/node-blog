const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Please, provide your username!"],
  },
  email: {
    type: String,
    required: [true, "Please, provide your email!"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please, provide your password!"],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
