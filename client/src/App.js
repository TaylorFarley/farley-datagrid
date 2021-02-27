
import './App.css';
import Signup from './Components/Signup'
import Login from './Components/Login'
import Home from './Components/Titles'
import FullWidthTabs from './Components/Tabs'
import UserContext from "./Context/UserContext";
import Loading from './Components/Loading'
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

  const [loading, setloading] = useState(false)

  useEffect(()=>{
    setloading(true)
    let token = localStorage.getItem("auth-token");
    if(!token)
    setloading(false)
    axios.post('/auth/tokenIsValid',
    null,
    { headers: { "x-auth-token": token } })
    .then((res)=>{
     
      setRealUser(res.data)
      setloading(false)
    })
  },[])

  return (

    <div className="App">
      
      <Router>
      <UserContext.Provider value={{ realUser, setRealUser }}><Switch>
          <Route path="/login">
          {loading?(<Loading/>):(realUser.email?<FullWidthTabs />:<Login />)}
          </Route>       
          <Route path="/">
            {loading?(<Loading/>):(realUser.email?<FullWidthTabs />:<Signup />)}
         
          </Route>
          
        </Switch>
        </UserContext.Provider>
        </Router>   

     
 
    
    </div>
  );
}

export default App;
