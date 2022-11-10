import { useState, useCallback, useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import { Outlet, Navigate } from "react-router-dom";
import { ThreeCircles } from "react-loader-spinner";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";
import { DashboardContext } from "../context/DashboardContext";
import "./DashboardLayout.css";
const AppLayout = () => {
  const cookies = new Cookies();
  const [Token, setToken] = useState(cookies.get("token"));
  const [data, setData] = useState([]);
  const [Loading, isLoading] = useState(false);
  const verifyUser = useCallback(() => {
    axios({
      method: "POST",
      url: "/refreshToken",
      withCredentials: true,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${Token}`,
      },
    })
      .then(async (response) => {
        console.log(response);
        if (response.status === 200) {
          const data = await response.json();
          cookies.set("token", data.token);
          setToken(data.token);
          console.log("token Refreshed");
        } else {
          cookies.set("token", null);
          setToken(null);
        }
        // call refreshToken every 1000 minutes to renew the authentication token.
        setTimeout(verifyUser, 100 * 600 * 1000);
      })
      .catch(function (err) {
        console.log(err);
        setTimeout(verifyUser, 100 * 600 * 1000);
      });
  });
  const fetchUserDetails = useCallback(() => {
    isLoading(true);
    axios({
      method: "get",
      url: "/user",
      withCredentials: true,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${Token}`,
      },
    }).then(async (response) => {
      if (response.status === 200) {
        const newdata = await response.data;
        //Passing EmployeeID to cookie for further Usage
        cookies.set("empID", newdata.employeeID);
        setData(newdata);
        isLoading(false);
      } else {
        if (response.status === 401) {
          // Edge case: when the token has expired.
          // This could happen if the refreshToken calls have failed due to network error or
          // User has had the tab open from previous day and tries to click on the Fetch button
          window.location.reload(false);
        } else {
          cookies.remove("empID");
        }
      }
    });
  });
  useEffect(() => {
    verifyUser();
  }, [verifyUser]);
  useEffect(() => {
    // fetch only when user details are not present
    if (!data || data.length === 0) {
      fetchUserDetails();
    }
  }, [data, fetchUserDetails]);
  return !Token ? (
    <Navigate to="/login" replace={true} />
  ) : Loading === true ? (
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
    <div className="dashboard">
      <DashboardContext.Provider value={data}>
        <Navbar />
        <Sidebar />
        <Outlet />
      </DashboardContext.Provider>
    </div>
  );
};

export default AppLayout;
