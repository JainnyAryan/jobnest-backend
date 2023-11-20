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

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/check-username", (req, res) => {
  const { username } = req.body;
  UserModel.findOne({ username })
    .then((user) => {
      const isAvailable = !user;
      res.json({ available: isAvailable });
    })
    .catch((err) => res.json({ available: false, error: err.message }));
});

app.post("/check-email", (req, res) => {
  const { email } = req.body;
  UserModel.findOne({ email })
    .then((user) => {
      const isAvailable = !user;
      res.json({ available: isAvailable });
    })
    .catch((err) => res.json({ available: false, error: err.message }));
});

app.post("/register", async (req, res) => {
  const data = req.body;

  try {
    const isUsernameAvailable = await checkAvailability("username", data.username);
    const isEmailAvailable = await checkAvailability("email", data.email);

    if (isUsernameAvailable && isEmailAvailable) {
      const newUser = await UserModel.create(data);
      res.json(newUser);
    } else {
      res.json({
        status: false,
        message: "Username or Email already taken",
        data: null,
      });
    }
  } catch (err) {
    res.json({
      status: false,
      message: "Error occurred while registering",
      data: null,
      error: err.message,
    });
  }
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
  if (!data.userId) {
    res.json({ status: false, message: "UserId not supplied", data: null });
  } else {
    EmployerModel.findOne({ userId: data.userId })
      .then((response) =>
        res.json({ status: true, message: "Success", data: response })
      )
      .catch((err) => res.json({ status: false, message: err.message, data: null }));
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
  if (!data.userId) {
    res.json({ status: false, message: "UserId not supplied", data: null });
  } else {
    EmployeeModel.findOne({ userId: data.userId })
      .then((response) =>
        res.json({ status: true, message: "Success", data: response })
      )
      .catch((err) => res.json({ status: false, message: err.message, data: null }));
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

app.delete("/delete_job", (req, res) => {
  const data = req.query;
  console.log(data);
  JobModel.findOneAndDelete({ _id: data.jobId })
    .then((_) => EmployeeJobApplicationModel.deleteMany({ jobId: data.jobId }))
    .then((_) =>
      AppliedJobsModel.updateMany({}, { $pull: { jobIds: data.jobId } })
    )
    .then((r) => res.json(r))
    .catch((err) => res.json(err));
});

app.listen(process.env.PORT || 3001, () => {
  console.log("Server is running at 3001");
});

module.exports = app;
