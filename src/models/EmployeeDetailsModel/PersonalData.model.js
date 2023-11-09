const mongoose = require("mongoose");

const PersonalDataSchema = new mongoose.Schema(
    {
        phoneNumber: String,
        dob: String,
        gender: String,
        desc: String
    }
);

const PersonalData = mongoose.model("signupdata", PersonalDataSchema);
module.exports = PersonalData;
