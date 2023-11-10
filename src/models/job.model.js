const mongoose = require("mongoose");

const JobModelSchema = new mongoose.Schema({
  orgName: String,
  role: String,
  locationType: String,
  location: String,
  salary: String,
  roleDescription: String,
  iconUrl: String,
});

const JobModel = mongoose.model("job", JobModelSchema);
module.exports = JobModel;
