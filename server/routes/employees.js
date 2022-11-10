const { response } = require("express");
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
// Get Data of Employees Name and ServiceList Only from database
router.get("/general_infos", (req, res) => {
  try {
    Employee.find({})
      .select("name serviceList")
      .exec(function (err, employee) {
        if (err) {
          console.log(err);
        } else {
          let serviceName = [];
          let BarberName = [];
          employee.map((emp) => {
            BarberName.push(emp.name);
            emp.serviceList.map((service) => {
              if (serviceName.includes(service.name) === false) {
                serviceName.push(service.name);
              }
            });
          });
          res
            .status(200)
            .json({ data: { barbers: BarberName, services: serviceName } });
        }
      });
  } catch (e) {
    res.status(400).json({ success: false, data: e });
  }
});
// Create a new employee on database
router.post("/", (req, res) => {
  let {
    EmployeeName,
    EmployeeAddress,
    EmployeeAvatar,
    EmployeeEmail,
    EmployeeisAdmin,
  } = req.body;
  let EmployeeID = GenerateID();
  async function saveDB() {
    try {
      let newEmployee = new Employee({
        name: EmployeeName,
        address: EmployeeAddress,
        email: EmployeeEmail,
        employeeID: EmployeeID,
        isAdmin: EmployeeisAdmin,
        avatar: EmployeeAvatar,
      });
      await newEmployee
        .save()
        .then(() => res.sendStatus(200).json("Registred"));
    } catch (error) {
      console.log(error);
    }
  }
  saveDB();
});
router.put("/service", async (req, res) => {
  const { ServiceName, ServicePrice } = req.body;
  const userID = req.cookies.empID;
  const employee = await Employee.findOne({ employeeID: userID });
  employee.serviceList.push({ name: ServiceName, price: ServicePrice });
  await employee
    .save()
    .then(() => {
      res.send("Update Employee");
    })
    .catch((err) => {
      res.send(err.message);
    });
});
router.put("/profile", async (req, res) => {
  const { EmployeeName, EmployeeEmail, EmployeeAddress, EmployeeAvatar } =
    req.body;
  if (!EmployeeName || !EmployeeEmail || !EmployeeAddress || !EmployeeAvatar) {
    res.statusCode(401);
    res.send({
      message: "Failed!",
      info: "Please check the Entered Data and try again ",
    });
  }
  const userID = req.cookies.empID;
  const employee = await Employee.findOne({ employeeID: userID });
  employee.name = EmployeeName;
  employee.email = EmployeeEmail;
  employee.address = EmployeeAddress;
  employee.avatar = EmployeeAvatar;
  await employee
    .save()
    .then(() => {
      res.statusCode = 200;
      res.send({
        message: "Success !",
        info: "Profile Updated Successfully !",
      });
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send({
        message: "Internal Server Error !",
        info: err.message,
      });
    });
});
router.delete("/", (req, res) => {
  res.send("Delete Employee");
});

module.exports = router;
