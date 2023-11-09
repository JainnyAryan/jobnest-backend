const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
mongoose.set("strictQuery", true);

const UserModel = require("./src/models/user.model");
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://test:123@cluster0.3hhy1wv.mongodb.net/employee"
);
var db = mongoose.connection;
db.on("open", () => console.log("Connected to DB"));
db.on("error", () => console.log("Error occurred"));

app.post("/register", (req, res) => {
  UserModel.create(req.body)
    .then((register) => res.json(register))
    .catch((err) => res.json(err));
});
app.post('/login',(req,res)=>{
  const {email,password}=req.body;
  UserModel.findOne({email:email})
  .then(user =>{
      if(user){
          if(user.password===password)
          {
              res.json("Success")
          }
          else
          {
              res.json("the password is incorrect")
          }
      }
      else{
          res.json("No record existed");
      }
  })
})

app.listen(3001, () => {
  console.log("Server is running at 3001");
});
