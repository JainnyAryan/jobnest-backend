const mongoose = require("mongoose");

const EmployeeJobApplicationModelSchema = new mongoose.Schema({
  name: String,
  email: String,
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

  resumeLink: String,

  jobDetails: String,
  jobId: String,
  applicantId: String,
  applicantDetails: String,

  status: String,
});

const EmployeeJobApplicationModel = mongoose.model(
  "employee_job_application",
  EmployeeJobApplicationModelSchema
);
module.exports = EmployeeJobApplicationModel;
