const mongoose = require('mongoose');

const EmployeeJobApplicationModelSchema = mongoose.Schema({
    personal:{
        name: String,
        email: String,
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

const EmployeeJobApplicationModel = mongoose.model("employee_job_application", EmployeeJobApplicationModelSchema);
module.exports = EmployeeJobApplicationModel;