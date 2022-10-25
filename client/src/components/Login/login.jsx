import react, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import LoginImage from "../../assets/login.jpg";
import "./login.css";
import { VscLock } from "react-icons/vsc";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    try {
      axios({
        method: "POST",
        data: {
          email: email,
          password: password,
        },
        withCredentials: true,
        url: "/login",
      }).then((res) => console.log(res));
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
        <form onSubmit={login}>
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
