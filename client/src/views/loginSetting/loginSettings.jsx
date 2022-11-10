import React from "react";
import { DashboardContext } from "../../context/DashboardContext";
import axios from "axios";
import Swal from "sweetalert2";
import { ThreeCircles } from "react-loader-spinner";
export default function Section() {
  const data = React.useContext(DashboardContext);
  const [Password, setnewPassword] = React.useState([]);
  const [RepeatPassword, setRepeatPassword] = React.useState([]);

  const [Error, setError] = React.useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const email = data.email;
    // Verification of the password and the repeated password are matching
    if (Password !== RepeatPassword) {
      setError("Password is not matched with the repeated one");
    } else {
      try {
        axios({
          method: "POST",
          url: "/passUpdate",
          headers: { "Content-Type": "application/json" },
          data: JSON.stringify({ email, Password }),
          withCredentials: true,
        })
          .then(async (response) => {
            if (response.status !== 200) {
              if (response.status === 400) {
                setError("Please fill all the fields correctly!");
              } else if (response.status === 404) {
                setError("User Not Found , Please Contact the boss!");
              } else {
                setError("Please Try Again");
              }
            } else if (response.status === 200) {
              Swal.fire({
                icon: "success",
                title: "Done",
                text: "Password Changed !",
              });
              setnewPassword("");
              setRepeatPassword("");
            }
          })
          .catch((er) => {
            setError("Oups! Something went wrong.\n" + er.message);
          });
      } catch (error) {
        setError("Oups! Something went wrong.\n" + error.message);
        console.log(error);
      }
    }
  };
  if (Error) {
    Swal.fire({
      icon: "error",
      title: "Oups !",
      text: Error,
    });
    setError("");
  }

  return data.length === 0 ? (
    <main class="content-wrap LoadingSection">
      <ThreeCircles
        height="80"
        width="80"
        color="#4b84fe"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor=""
        innerCircleColor=""
        middleCircleColor=""
      />
    </main>
  ) : (
    <main class="content-wrap services">
      <header class="content-head">
        <h1>Login Setting</h1>
      </header>
      <div className="content">
        <div className="inputorder_container">
          <h2>Edit Password</h2>
          <div className=" tableBox  ">
            <form onSubmit={handleSubmit} className="inputServices">
              <div>
                <span>Email :</span>
                <input
                  type="email"
                  name="Email"
                  id="Email"
                  value={data.email}
                  disabled
                />
              </div>
              <div>
                <span>New Password :</span>
                <input
                  type="password"
                  name="Password"
                  id="Password"
                  value={Password}
                  onChange={(e) => setnewPassword(e.target.value)}
                  placeholder="Type your password here ..."
                />
              </div>
              <div>
                <span>Repeat Password :</span>
                <input
                  type="password"
                  name="Password"
                  id="Password"
                  value={RepeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  placeholder="Repeat password ..."
                />
              </div>
              <button type="submit" className="btn btnService">
                Add Service
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
