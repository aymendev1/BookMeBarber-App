const express = require("express");
const router = express.Router();
const connectDB = require("../DB/mongoose");
const Employee = require("../models/employeeSchema");

function GenerateID() {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var Numbers = "1234567890";
  var charactersLength = characters.length;
  var NumbersLength = Numbers.length;
  for (var i = 0; i < 5; i++) {
    if (i === 0) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    result += Numbers.charAt(Math.floor(Math.random() * NumbersLength));
  }
  return result;
}

// Get Data of Employees from database
router.get("/", (req, res) => {
  try {
    Employee.find({}, function (err, employee) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(employee);
      }
    });
  } catch (e) {
    res.status(400).json({ success: false, data: e });
  }
});
// Create a new employee on database
router.post("/", (req, res) => {
  let { EmployeeName, EmployeeAddress, EmployeeEmail, EmployeeServiceList } =
    req.body;
  let EmployeeID = GenerateID();
  console.log({
    EmployeeName,
    EmployeeAddress,
    EmployeeEmail,
    EmployeeServiceList,
    EmployeeID,
  });
  async function saveDB() {
    try {
      console.log("Starting to save");
      let newEmployee = new Employee({
        name: EmployeeName,
        address: EmployeeAddress,
        email: EmployeeEmail,
        serviceList: EmployeeServiceList,
        employeeID: EmployeeID,
      });
      await newEmployee.save().then(() => console.log("Saved !!"));
    } catch (error) {
      console.log(error);
    }
  }
  saveDB();
});
router.put("/", (req, res) => {
  res.send("Update Employee");
});
router.delete("/", (req, res) => {
  res.send("Delete Employee");
});

module.exports = router;
