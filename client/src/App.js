import "./App.css";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Home from "./Components/Titles";
import FullWidthTabs from "./Components/Tabs";
import UserContext from "./Context/UserContext";
import Loading from "./Components/Loading";
import React, { useState, useEffect } from "react";

import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  const [realUser, setRealUser] = useState({
    email: null,
    firstName: null,
    lastName: null,
  });

  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");

      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await axios.post("/auth/tokenIsValid", null, {
        headers: { "x-auth-token": token },
      });
      console.log(tokenRes.data);
      setRealUser(tokenRes.data);
      console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^");
      setloading(false);
    };

    checkLoggedIn();
  }, []);

  return (
    <div className="App">
      <Router>
        <UserContext.Provider value={{ realUser, setRealUser }}>
          <Switch>
            <Route path="/login">
              {loading ? (
                <Loading />
              ) : realUser.email ? (
                <FullWidthTabs />
              ) : (
                <Login />
              )}
            </Route>
            <Route path="/">
              {loading ? (
                <Loading />
              ) : realUser.email ? (
                <FullWidthTabs />
              ) : (
                <Signup />
              )}
            </Route>
          </Switch>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
