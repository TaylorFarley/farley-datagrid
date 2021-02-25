
import './App.css';
import Signup from './Components/Signup'
import UserContext from "./Context/UserContext";
import React, {useState, useEffect} from 'react'
import axios from 'axios'
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
        <UserContext.Provider value={{ realUser, setRealUser }}>
          {realUser.email?(<>Hi {realUser.firstName}</>):<Signup />}
 
      </UserContext.Provider>
    </div>
  );
}

export default App;
