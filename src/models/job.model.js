const mongoose = require("mongoose");

const JobModelSchema = new mongoose.Schema({
  orgName: String,
  role: String,
  locationType: String,
  location: String,
  salary: String,
  roleDescription: String,
  iconUrl: String,
  employer: mongoose.Schema.Types.Mixed,
});

const JobModel = mongoose.model("job", JobModelSchema);
module.exports = JobModel;
