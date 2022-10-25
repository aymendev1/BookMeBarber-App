const mongoose = require("mongoose");
const findOrCreate = require("mongoose-find-or-create");
const ReservationSchema = new mongoose.Schema({
  ReservationName: {
    type: String,
    required: true,
  },
  ReservationPhoneNumber: {
    type: String,
    required: true,
  },
  ReservationEmail: {
    type: String,
    required: true,
  },
  ReservationAppointmentDate: {
    type: Date,
    required: true,
  },
  ReservationBarberName: {
    type: String,
    required: true,
  },
  ReservationServiceChosen: {
    type: String,
    required: true,
  },
});
ReservationSchema.plugin(findOrCreate);
module.exports = Reservation = mongoose.model(
  "reservations",
  ReservationSchema
);
