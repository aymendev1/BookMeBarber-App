import "./navbar.css";
import { useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import { AiOutlinePoweroff } from "react-icons/ai";
export default function Navbar() {
  const cookies = new Cookies();
  const [Token, setToken] = useState(cookies.get("token"));
  const logoutHandler = () => {
    axios("/logout", {
      method: "GET",
      url: "/logout",
      withCredentials: true,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${Token}`,
      },
    }).then(async (response) => {
      window.localStorage.setItem("logout", Date.now());
      cookies.remove("token");
      cookies.remove("empID");
      window.location.replace("/login");
    });
  };
  return (
    <aside class="search-wrap">
      <div class="search">
        <label for="search">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z" />
          </svg>
          <input type="text" id="search" />
        </label>
      </div>

      <div class="user-actions">
        <button onClick={logoutHandler}>
          <span>Log out</span>
          <AiOutlinePoweroff />
        </button>
      </div>
    </aside>
  );
}
