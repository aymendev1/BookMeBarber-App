import { useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";
import { UserContext } from "../../context/UserContext";
import { Navigate } from "react-router";
import LoginImage from "../../assets/login.jpg";
import "./login.css";
import { VscLock } from "react-icons/vsc";
export default function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ErrorMsg, setError] = useState("");
  const [usersContext, setUserContext] = useContext(UserContext);
  const cookies = new Cookies();
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    try {
      axios({
        method: "POST",
        url: "/login",
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify({ username: email, password }),
        withCredentials: true,
      }).then(async (response) => {
        if (response.status !== 200) {
          if (response.status === 400) {
            setError("Please fill all the fields correctly!");
          } else if (response.status === 401) {
            setError("Email Doesn't belong to any Employee");
          } else {
            setError("Please Try Again");
          }
        } else {
          const data = await response.data;
          if (data) {
            cookies.set("token", data.token, { path: "/" });
            setUserContext((oldValues) => {
              return { ...oldValues, token: data.token };
            });
            Swal.fire({
              icon: "success",
              title: "Logged In !",
              text: "Welcome Back :)",
            });
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
    if (ErrorMsg) {
      Swal.fire({
        icon: "error",
        title: "Oups !",
        text: ErrorMsg,
      });
      setError("");
    }
  };
  return !usersContext.token ? (
    <div className="LoginPageContainer">
      <div className="imageSide">
        <img src={LoginImage} alt="" />
      </div>
      <div className="SignInContainer">
        <div>
          <div className="iconLock">
            <VscLock />
          </div>
          <span>Sign in</span>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            id=""
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            name="password"
            id=""
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="btn btnSignIn">Sign In</button>
        </form>
      </div>
    </div>
  ) : (
    <Navigate replace to="/dashboard" />
  );
}
