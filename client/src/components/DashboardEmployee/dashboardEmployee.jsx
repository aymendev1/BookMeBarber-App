import react, { useContext, useState, useEffect, useCallback } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "axios";

function App() {
  const [userContext, setUserContext] = useContext(UserContext);
  const verifyUser = useCallback(() => {
    axios({
      method: "POST",
      url: "/refreshToken",
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        setUserContext((oldValues) => {
          return { ...oldValues, token: data.token };
        });
      } else {
        setUserContext((oldValues) => {
          return { ...oldValues, token: null };
        });
      }
      // call refreshToken every 5 minutes to renew the authentication token.
      setTimeout(verifyUser, 5 * 60 * 1000);
    });
  }, [setUserContext]);

  useEffect(() => {
    verifyUser();
  }, [verifyUser]);

  return userContext.token === null ? (
    <div>Not Logged In ? Please Login and try again</div>
  ) : userContext.token ? (
    <div>WelcomeBBy</div>
  ) : (
    <div>Loading ...</div>
  );
}

export default App;
