const express = require("express");
const router = express.Router();
const Reservation = require("../models/reservationSchema");
// define the home page route
router.get("/", (req, res) => {
  res.send("Reservations Get");
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
    newReservation.save().then(() => console.log("Saved Correctly"));
  } catch (error) {}
});
router.put("/", (req, res) => {
  res.send("Update Reservation");
});
router.delete("/", (req, res) => {
  res.send("Delete Reservation");
});

module.exports = router;
