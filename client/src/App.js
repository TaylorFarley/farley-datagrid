
import './App.css';
import Signup from './Components/Signup'
import Login from './Components/Login'
import Home from './Components/Home'
import UserContext from "./Context/UserContext";
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {




  const [realUser, setRealUser] = useState ({
    email: null,
    firstName: null,
    lastName: null
  })

  useEffect(()=>{
    let token = localStorage.getItem("auth-token");
    axios.post('/auth/tokenIsValid',
    null,
    { headers: { "x-auth-token": token } })
    .then((res)=>{
      console.log(res.data)
      setRealUser(res.data)

    })
  },[])
  
  return (

    <div className="App">
      
      <Router>
      <UserContext.Provider value={{ realUser, setRealUser }}><Switch>
          <Route path="/login">
          {realUser.email?<Home />:<Login />}
          </Route>       
          <Route path="/">
          {realUser.email?<Home />:<Signup />}
          </Route>
        </Switch>
        </UserContext.Provider>
        </Router>   

     
 
    
    </div>
  );
}

export default App;
