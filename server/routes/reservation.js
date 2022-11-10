const express = require("express");
const router = express.Router();
const Reservation = require("../models/reservationSchema");
const Employee = require("../models/employeeSchema");
// define the home page route
router.get("/", (req, res) => {
  const { isAdmin } = req.query;
  if (isAdmin === "true") {
    Reservation.find({}, function (err, docs) {
      if (!err) {
        res.statusCode = 200;
        res.send(docs);
      }
      if (err) {
        res.statusCode = 500;
        res.send({
          message: "Internal Server Error",
          info: " Failed While Getting Data " + err,
        });
      }
    });
  } else {
    res.statusCode = 401;
    res.send({
      message: "Access Denied",
      info: "You do not have permission to access to the following resources",
    });
  }
});
// define the about route
router.post("/", (req, res) => {
  const {
    ReservationClientName,
    ReservationClientPhoneNumber,
    ReservationClientEmail,
    ReservationClientAppointmentDate,
    ReservationClientBarberName,
    ReservationClientServiceChosen,
  } = req.body;
  try {
    let newReservation = new Reservation({
      ReservationName: ReservationClientName,
      ReservationPhoneNumber: ReservationClientPhoneNumber,
      ReservationEmail: ReservationClientEmail,
      ReservationAppointmentDate: ReservationClientAppointmentDate,
      ReservationBarberName: ReservationClientBarberName,
      ReservationServiceChosen: ReservationClientServiceChosen,
    });
    Employee.findOne(
      { name: ReservationClientBarberName },
      function (err, emp) {
        if (!err) {
          emp.appointments.push({
            ReservationName: ReservationClientName,
            ReservationPhoneNumber: ReservationClientPhoneNumber,
            ReservationEmail: ReservationClientEmail,
            ReservationAppointmentDate: ReservationClientAppointmentDate,
            ReservationServiceChosen: ReservationClientServiceChosen,
          });
          emp.save();
        } else {
          res.send(err);
        }
      }
    );
    newReservation.save().then(() => {
      res.statusCode = 200;
      res.send({
        message: "Appointment Booked !",
        info: "Your appointment has been registered correctly",
      });
    });
  } catch (error) {}
});
router.put("/", (req, res) => {
  res.send("Update Reservation");
});
router.delete("/", (req, res) => {
  res.send("Delete Reservation");
});

module.exports = router;
