import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./main.css";
import Header from "../Header/header";

export default function Main() {
  const [name, setName] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [BarberName, setBarberName] = useState("");
  const [Service, setService] = useState("");
  const [Date, setDate] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const resp = axios.post("/reservation", {
        ReservationClientName: name,
        ReservationClientPhoneNumber: PhoneNumber,
        ReservationClientEmail: email,
        ReservationClientAppointmentDate: Date,
        ReservationClientBarberName: BarberName,
        ReservationClientServiceChosen: Service,
      });
      Swal.fire({
        icon: "success",
        title: "Appointment Booked !",
        text: "Your Appointment has been booked , see you soon !",
      });
    } catch (error) {
      console.log(error.response);
      Swal.fire({
        icon: "errorIconHtml",
        title: "Oups !",
        text: "Please Try Again!",
      });
    }
  };

  return (
    <div className="mainSection">
      <div className="cardOverlay">
        <Header />
        <div className="mainContent">
          <div className="left-m">
            <span>Barbers &</span>
            <span>Hair cutting</span>
            <span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui rem
              non consequatur !
            </span>
            <button className="btn btnAdress">More info</button>
          </div>
          <div className="right-m">
            <div className="appointmentCard">
              <span>Book a chair</span>
              <form onSubmit={handleSubmit}>
                <input
                  type="txt"
                  name="ReservationClientName"
                  id=""
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  required
                />

                <input
                  type="txt"
                  name="ReservationClientPhoneNumber"
                  id=""
                  value={PhoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Phone Number"
                  required
                />
                <input
                  type="email"
                  name="ReservationClientEmail"
                  id=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                />
                <input
                  type="datetime-local"
                  step="900"
                  name="ReservationClientAppointmentDate"
                  id="appointmentDate"
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
                <input
                  type="text"
                  name="ReservationClientBarberName"
                  list="barberList"
                  multiple
                  placeholder="Barber"
                  value={BarberName}
                  onChange={(e) => setBarberName(e.target.value)}
                  required
                />
                <datalist id="barberList">
                  <option value="Jack" />
                  <option value="Ania" />
                  <option value="Barber No 3" />
                  <option value="Barber No 4" />
                  <option value="Barber No 5" />
                </datalist>
                <input
                  type="text"
                  name="ReservationClientServiceChosen"
                  list="Services"
                  multiple
                  placeholder="Please Choose the service ..."
                  value={Service}
                  onChange={(e) => setService(e.target.value)}
                  required
                />

                <datalist id="Services">
                  <option value="Haircut" />
                  <option value="Barber Cut" />
                  <option value="Haircut Cut No 3" />
                  <option value="Haircut Cut No 4" />
                  <option value="Haircut Cut No 5" />
                </datalist>

                <button type="submit" className="btn btnBook">
                  {" "}
                  Book now{" "}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
