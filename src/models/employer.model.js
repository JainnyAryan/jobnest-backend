const mongoose = require("mongoose");

const EmployerModelSchema = mongoose.Schema({
  personal: {
    phone: String,
    dob: String,
    gender: String,
    description: String,
  },
  corporate: {
    orgName: String,
    designation: String,
    officeLocation: String,
    orgEmail: String,
    orgPhone: String,
  },
});

const EmployerModel = mongoose.model("employer", EmployerModelSchema);
module.exports = EmployerModel;