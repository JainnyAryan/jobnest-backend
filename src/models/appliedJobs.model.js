const mongoose = require("mongoose");

const AppliedJobsSchema = new mongoose.Schema({
  userId: String,
  jobIds: [String],
});

const AppliedJobsModel = mongoose.model("applied_job", AppliedJobsSchema);
module.exports = AppliedJobsModel;
