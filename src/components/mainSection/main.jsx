import React from "react";
import "./main.css";
import Header from "../Header/header";

export default function Main() {
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
              <form action="/" method="post">
                <input
                  type="txt"
                  name="FullName"
                  id=""
                  placeholder="Full Name"
                  required
                />

                <input
                  type="txt"
                  name="PhoneNumber"
                  id=""
                  placeholder="Phone Number"
                  required
                />
                <input
                  type="email"
                  name="email"
                  id=""
                  placeholder="Email"
                  required
                />
                <input
                  type="datetime-local"
                  name="appointmentDate"
                  id="appointmentDate"
                  required
                />
                <input
                  type="text"
                  name="barberName"
                  list="barberList"
                  multiple
                  placeholder="Barber"
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
                  name="serviceName"
                  list="Services"
                  multiple
                  placeholder="Please Choose the service ..."
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
