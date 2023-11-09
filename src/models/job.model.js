const mongoose = require("mongoose");

const JobModelSchema = mongoose.Schema({
    organisation: String,
    role: String,
    locationType: String,
    location: String,
    salary: String,
    roleDescription: String,  
}) 

const JobModel = mongoose.model("job", JobModelSchema);
module.exports = JobModel;