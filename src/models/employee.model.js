const mongoose = require("mongoose");

const EmployeeModelSchema = new mongoose.Schema({
  userId: String,

  phone: String,
  dob: String,
  gender: String,
  description: String,

  collegeName: String,
  collegeStream: String,
  cgpa: String,
  schoolName: String,
  intermediateSchoolPercentage: String,
  highSchoolPercentage: String,

  organisation: String,
  workDuration: String,
  role: String,
  roleDescription: String,

  awards: String,
  certifications: String,
});

const EmployeeModel = mongoose.model("employee", EmployeeModelSchema);
module.exports = EmployeeModel;
