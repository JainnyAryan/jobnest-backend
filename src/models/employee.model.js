const mongoose = require('mongoose');

const EmployeeModelSchema = mongoose.Schema({
    personal:{
        phone: String,
        dob: String,
        gender: String,
        description: String,
    },
    educational:{
        college: String,
        stream: String,
        cgpa: String,
        school: String,
        highSchool: String,
        intermediateSchool: String,
    },
    experience:{
        organisation: String,
        duration: String,
        role: String,
        roleDescription: String,
    },
    achievements: {
        awards: String,
        certifications: String,
    },
    resume: {
        link: String,
    }
});

const EmployeeModel = mongoose.model("employee", EmployeeModelSchema);
module.exports = EmployeeModel;