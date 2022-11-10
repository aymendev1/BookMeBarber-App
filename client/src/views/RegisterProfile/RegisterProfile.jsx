import { useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import FileBase64 from "react-file-base64";
import { DashboardContext } from "../../context/DashboardContext";
import "./Register.css";
export default function ProfileView() {
  const UserDetails = useContext(DashboardContext);
  const [EmployeeName, setEmployeeName] = useState("");
  const [EmployeeEmail, setEmployeeEmail] = useState("");
  const [EmployeeAddress, setEmployeeAddress] = useState("");
  const [EmployeeAvatar, setEmployeeAvatar] = useState("");
  const [Password, setnewPassword] = useState([]);
  const [RepeatPassword, setRepeatPassword] = useState([]);
  const [EmployeeisAdmin, setisAdmin] = useState(false);
  const [ErrorMsg, setErrorMsg] = useState();
  // Checking if the user is Admin
  if (UserDetails.isAdmin !== true) {
    setErrorMsg({
      message: "Access Denied !",
      info: "You don't have the access to the following resources",
    });
  }
  // Converting the Uploaded Image to Base64 to store it in Database
  const getFiles = (files) => {
    console.log(files.type);
    const TypeOfAcceptedFiles = ["image/jpeg", "image/webp", "image/png"];
    if (TypeOfAcceptedFiles.includes(files.type))
      setEmployeeAvatar(files.base64);
    else {
      setErrorMsg("Please Upload a valid Image file");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      axios({
        method: "POST",
        url: "/employee/",
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify({
          EmployeeName,
          EmployeeEmail,
          EmployeeAddress,
          EmployeeAvatar,
          EmployeeisAdmin,
        }),
        withCredentials: true,
      })
        .then(async (response) => {
          if (response.status !== 200) {
            if (response.status === 400) {
              setErrorMsg("Please fill all the fields correctly!");
            } else if (response.status === 401) {
              setErrorMsg("Invalid email and password combination.");
            } else {
              setErrorMsg("Please Try Again");
            }
          } else {
            const data = await response.data;
            if (data) {
              Swal.fire({
                icon: "success",
                title: "Employee Registered !",
                text: "New Employee have been registered",
              });
            }
          }
        })
        .catch((er) => {
          setErrorMsg({
            message: er.response.data.message,
            info: er.response.data.info,
          });
        });
    } catch (error) {
      setErrorMsg({
        message: "Something went wrong :(",
        info: error,
      });
    }
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();
    setErrorMsg("");
    if (Password !== RepeatPassword) {
      setErrorMsg("Password is not matched with the repeated one");
    } else {
      try {
        axios({
          method: "POST",
          url: "/signup",
          headers: { "Content-Type": "application/json" },
          data: JSON.stringify({
            EmployeeEmail,
            Password,
          }),
          withCredentials: true,
        })
          .then(async (response) => {
            if (response.status !== 200) {
              if (response.status === 400) {
                setErrorMsg("Please fill all the fields correctly!");
              } else if (response.status === 401) {
                setErrorMsg("Email Doesn't belong to any Employee");
              } else {
                setErrorMsg("Please Try Again");
              }
            } else {
              const data = await response.data;
              if (data) {
                Swal.fire({
                  icon: "success",
                  title: "Login Created!",
                  text: "New Logging has been added !",
                });
                setnewPassword("");
                setRepeatPassword("");
                setEmployeeEmail("");
              }
            }
          })
          .catch((er) => {
            console.log(er);
            setErrorMsg(er.response.data.message);
          });
      } catch (error) {
        setErrorMsg(error.message);
      }
    }
  };
  if (ErrorMsg) {
    Swal.fire({
      icon: "error",
      title: ErrorMsg.message,
      text: ErrorMsg.info,
    });
    setTimeout(() => {
      window.location.replace("/dashboard");
    }, 2000);
  }
  return ErrorMsg ? (
    <main class="content-wrap"></main>
  ) : (
    <main class="content-wrap">
      <header class="content-head">
        <h1>Edit Profile</h1>
      </header>
      <div className="content">
        <div className="container">
          <div className="right">
            <div className=" tableBox  ">
              <form onSubmit={handleSubmit} className="profileInput">
                <div>
                  <span>Full Name :</span>
                  <input
                    type="text"
                    name="EmployeeName"
                    id="name"
                    placeholder=" Employee Name Here ..."
                    onChange={(e) => setEmployeeName(e.target.value)}
                  />
                </div>
                <div>
                  <span> Email :</span>
                  <input
                    type="email"
                    name="EmployeeEmail"
                    id="email"
                    placeholder="email@example.com"
                    onChange={(e) => setEmployeeEmail(e.target.value)}
                  />
                </div>
                <div>
                  <span>Address :</span>
                  <input
                    type="text"
                    name="EmployeeAddress"
                    id=""
                    placeholder="Stress,Flat No ..."
                    onChange={(e) => setEmployeeAddress(e.target.value)}
                  />
                </div>
                <div>
                  <span>Admin Access :</span>
                  <div>
                    <input
                      type="radio"
                      name="admin"
                      onChange={(e) => setisAdmin(true)}
                    />{" "}
                    Yes
                    <input
                      type="radio"
                      name="admin"
                      onChange={(e) => setisAdmin(false)}
                    />{" "}
                    No
                  </div>
                </div>
                <div>
                  <span>Avatar :</span>
                  <FileBase64
                    accept="image/*"
                    multiple={false}
                    onDone={getFiles.bind(this)}
                  />
                </div>
                <button type="submit" className="btn btnProfile">
                  Register User
                </button>
              </form>
            </div>
          </div>
          <div className="left">
            <div className=" tableBox  ">
              <form onSubmit={handleSubmit2} className="profileInput">
                <div>
                  <span>Email :</span>
                  <input
                    type="email"
                    name="EmployeeEmail"
                    id="email"
                    placeholder=" Employee Email Here ..."
                    onChange={(e) => setEmployeeEmail(e.target.value)}
                    value={EmployeeEmail}
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
                <button type="submit" className="btn btnProfile">
                  Register Login User
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
