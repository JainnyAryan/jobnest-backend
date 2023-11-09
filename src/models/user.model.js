const mongoose = require("mongoose");

const UserModelSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  password: String,
  isEmployer: Boolean,
});

const UserModel = mongoose.model("user", UserModelSchema);
module.exports = UserModel;
