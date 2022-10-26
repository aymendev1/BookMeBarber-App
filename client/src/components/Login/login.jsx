import react, { useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { UserContext } from "../../context/UserContext";
import LoginImage from "../../assets/login.jpg";
import "./login.css";
import { VscLock } from "react-icons/vsc";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("Oups");
  const [usersContext, setUserContext] = useContext(UserContext);
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
      })
        .then(async (response) => {
          console.log(response);
          if (response.status !== 200) {
            if (response.status === 400) {
              setError("Please fill all the fields correctly!");
            } else if (response.status === 401) {
              setError("Invalid email and password combination.");
            } else {
              setError("Please Try Again");
            }
          } else {
            const data = await response.data;
            console.log(data.token);
            setUserContext((oldValues) => {
              return { ...oldValues, token: data.token };
            });
          }
        })
        .catch((er) => {
          console.log(er);
          Swal.fire({
            icon: "errorIconHtml",
            title: "Oups !",
            text: "Please Try Again!" + er,
          });
        });
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
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
        <div>
          <a>Forgot Password ?</a>
          <a>Don't have an account ? Sign Up </a>
        </div>
      </div>
    </div>
  );
}
