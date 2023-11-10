const mongoose = require("mongoose");

const EmployerModelSchema = new mongoose.Schema({
  userId: String,
  phone: String,
  dob: String,
  gender: String,
  description: String,
  orgName: String,
  designation: String,
  officeLocation: String,
  orgEmail: String,
  orgPhone: String,
});

const EmployerModel = mongoose.model("employer", EmployerModelSchema);
module.exports = EmployerModel;
