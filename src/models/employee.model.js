const mongoose = require("mongoose");

const EmployeeModelSchema = mongoose.Schema({
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
