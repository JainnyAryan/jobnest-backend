const mongoose = require("mongoose");

const UserModelSchema = new mongoose.Schema(
    {
        name: String,
        username: String,
        email: String,
        password: String
    }
);

const UserModel = mongoose.model("signUpData", UserModelSchema);
module.exports = UserModel;
