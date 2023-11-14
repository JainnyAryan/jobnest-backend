const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const upload = multer();

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const UserModel = require("./src/models/user.model");
const JobModel = require("./src/models/job.model");
const EmployerModel = require("./src/models/employer.model");
const EmployeeModel = require("./src/models/employee.model");
const EmployeeJobApplicationModel = require("./src/models/employeeJobApplication.model");
const AppliedJobsModel = require("./src/models/appliedJobs.model");

mongoose.connect("mongodb+srv://test:123@cluster0.3hhy1wv.mongodb.net/jobnest");

var db = mongoose.connection;
db.on("open", () => console.log("Connected to DB"));
db.on("error", () => console.log("Error occurred"));

app.post("/register", (req, res) => {
  UserModel.create(req.body)
    .then((register) => res.json(register))
    .catch((err) => res.json(err));
});

app.post("/login", (req, res) => {
  const data = req.body;
  UserModel.findOne({
    $or: [{ email: data.userInput }, { username: data.userInput }],
  })
    .then((user) => {
      if (user) {
        if (user.password === data.password) {
          res.json({ status: true, message: "success", data: user });
        } else {
          res.json({
            status: false,
            message: "Incorrect password",
            data: null,
          });
        }
      } else {
        res.json({ status: false, message: "User does not exist", data: null });
      }
    })
    .catch((err) => res.json(err));
});

app.post("/post_job", upload.none(), (req, res) => {
  const data = req.body;
  console.log(data);
  JobModel.create(data)
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

app.get("/get_jobs", (req, res) => {
  const data = req.query;
  console.log(data);
  if (data.createdBySomeEmployer) {
    JobModel.find({ employerId: data.employerId })
      .then((response) => res.json(response))
      .catch((err) => res.json(err));
  } else {
    JobModel.find({})
      .then((jobs) => res.json(jobs))
      .catch((err) => res.json(err));
  }
});

app.post("/post_employer_details", upload.none(), (req, res) => {
  const data = req.body;
  console.log(data);
  EmployerModel.create(data)
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

app.get("/get_employer_details", (req, res) => {
  const data = req.query;
  console.log(data);
  if (!data.userId || !data) {
    res.json({ status: false, message: "UserId not supplied", data: null });
  } else {
    EmployerModel.findOne({ userId: data.userId })
      .then((response) =>
        res.json({ status: true, message: "Success", data: response })
      )
      .catch((err) => res.json(err));
  }
});

app.put("/update_employer_details", upload.none(), (req, res) => {
  const data = req.body;
  EmployerModel.findOneAndUpdate({ userId: data.userId }, { $set: data })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

app.put("/update_employee_details", upload.none(), (req, res) => {
  const data = req.body;
  EmployeeModel.findOneAndUpdate({ userId: data.userId }, { $set: data })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

app.post("/create_employee_job_application", upload.none(), (req, res) => {
  const data = req.body;
  console.log(data);
  EmployeeJobApplicationModel.create(data)
    .then((response) =>
      AppliedJobsModel.updateOne(
        { userId: data.applicantId },
        { $addToSet: { jobIds: data.jobId } },
        { upsert: true }
      )
    )
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

app.get("/check_job_applied", (req, res) => {
  const data = req.query;
  console.log(data);
  AppliedJobsModel.findOne({
    userId: data.userId,
    jobIds: { $elemMatch: { $eq: data.jobId } },
  })
    .then((result) => {
      if (result) {
        res.json({ jobApplied: true });
      } else {
        res.json({ jobApplied: false });
      }
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/get_employee_job_applications", (req, res) => {
  const data = req.query;
  if (data.ofPatricularJob) {
    console.log("yayayyyy");
    EmployeeJobApplicationModel.find({ jobId: data.jobId })
      .then((response) => {
        res.json(response);
        console.log(response);
      })
      .catch((err) => res.json(err));
  } else {
    EmployeeJobApplicationModel.find({ applicantId: data.applicantId })
      .then((response) => res.json(response))
      .catch((err) => res.json(err));
  }
});

app.post("/post_employee_details", upload.none(), (req, res) => {
  const data = req.body;
  console.log(data);

  EmployeeModel.create(data)
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

app.get("/get_employee_details", (req, res) => {
  const data = req.query;
  console.log(data);
  if (!data.userId || !data) {
    res.json({ status: false, message: "UserId not supplied", data: null });
  } else {
    EmployeeModel.findOne({ userId: data.userId })
      .then((response) =>
        res.json({ status: true, message: "Success", data: response })
      )
      .catch((err) => res.json(err));
  }
});

app.put("/update_employee_details", upload.none(), (req, res) => {
  const data = req.body;
  EmployeeModel.findOneAndUpdate({ userId: data.userId }, { $set: data })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

app.put("/update_status", (req, res) => {
  const data = req.body;
  console.log(data);
  EmployeeJobApplicationModel.findByIdAndUpdate(
    { _id: data.applicationId },
    { $set: { status: data.status } }
  )
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

app.listen(3001, () => {
  console.log("Server is running at 3001");
});
