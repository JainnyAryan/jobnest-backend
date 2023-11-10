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
  JobModel.find({})
    .then((jobs) => res.json(jobs))
    .catch((err) => res.json(err));
});

app.post("/post_employer_details", upload.none(), (req, res) => {
  const data = req.body;
  console.log(data);
  EmployerModel.create(data)
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

app.listen(3001, () => {
  console.log("Server is running at 3001");
});
