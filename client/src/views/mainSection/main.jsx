import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./main.css";

import Header from "../../components/Header/header";

export default function Main() {
  const [name, setName] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [BarberName, setBarberName] = useState("");
  const [BarberInfos, setBarberInfos] = useState([]);
  const [Service, setService] = useState("");
  const [Date, setDate] = useState("");
  const [ErrorMsg, setError] = useState();
  let today = new window.Date().toISOString().substring(0, 16);
  const fetchUserDetails = useCallback(() => {
    setError();
    axios({
      method: "get",
      url: "/employee/general_infos",
      withCredentials: true,
      headers: {
        "Content-type": "application/json",
      },
    }).then(async (response) => {
      if (response.status === 200) {
        const newdata = await response.data;
        // Setting the new data to State
        setBarberInfos(newdata.data);
      } else {
        if (response.status === 401) {
          // Edge case: when the token has expired.
          // This could happen if the refreshToken calls have failed due to network error or
          // User has had the tab open from previous day and tries to click on the Fetch button
          window.location.reload();
        } else {
          setError({
            message: "Failed While Loading Data ",
            info: "Please Try Again ",
          });
        }
      }
    });
  }, []);
  useEffect(() => {
    // fetch only when user details are not present
    if (!BarberInfos || BarberInfos.length === 0) {
      fetchUserDetails();
    }
  }, [BarberInfos, fetchUserDetails]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    try {
      axios({
        method: "POST",
        url: "/reservation",
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify({
          ReservationClientName: name,
          ReservationClientPhoneNumber: PhoneNumber,
          ReservationClientEmail: email,
          ReservationClientAppointmentDate: Date,
          ReservationClientBarberName: BarberName,
          ReservationClientServiceChosen: Service,
        }),
        withCredentials: true,
      })
        .then(async (response) => {
          const data = await response.data;
          Swal.fire({
            icon: "success",
            title: data.message,
            text: data.info,
          });
          setBarberName("");
          setName("");
          setPhoneNumber("");
          setService("");
          setDate("");
          setBarberInfos("");
          setEmail("");
        })
        .catch((er) => {
          setError({
            message: er.response.data.message,
            info: er.response.data.info,
          });
        });
    } catch (error) {
      setError({
        message: "Something went wrong :(",
        info: error,
      });
    }
  };
  if (ErrorMsg) {
    Swal.fire({
      icon: "error",
      title: ErrorMsg.message,
      text: ErrorMsg.info,
    });
  }
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
                  step="1800"
                  min={today}
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
                  {!BarberInfos || BarberInfos.length === 0 ? (
                    <option value="Loading Barbers" />
                  ) : (
                    BarberInfos.barbers.map((barber) => {
                      return <option value={barber} />;
                    })
                  )}
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
                  {!BarberInfos || BarberInfos.length === 0 ? (
                    <option value="Loading Services..." />
                  ) : (
                    BarberInfos.services.map((service) => {
                      return <option value={service} />;
                    })
                  )}
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
