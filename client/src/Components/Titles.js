import React, { useContext, useState, useEffect } from "react";
import UserContext from "../Context/UserContext";
import ReactDOM from "react-dom";
import axios from "axios";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import {
  DataSheetGrid,
  checkboxColumn,
  textColumn,
} from "react-datasheet-grid";
import "react-datasheet-grid/dist/index.css";

const Titles = () => {
  const { realUser, setRealUser } = useContext(UserContext);

  const [data, setData] = useState();
  const [title, setTitle] = useState()
  const columns = [
    textColumn({ title: "Title", key: "title", disabled:"true"}),
    textColumn({ title: "Log", key: "log" }),
    textColumn({ title: "Org", key: "org" }),
  ];

  useEffect(() => {
    axios.get("/data/dataGet").then((res) => {
      setData(res.data);   
    });
  }, []);

  useEffect(() => {
    axios.post("/data/dataSend", data).then((res) => {
      console.log(res);
    });
  }, [data]);

  const ShowBlanks = (event) => {
    event.preventDefault();
    let newArr = [];
    data.map((currentElement, index) => {
      if (currentElement.log == null) {
        newArr.push(currentElement);
      }
    });
    setData(newArr);
  };

  const ShowAll = (event) => {
    event.preventDefault();
    axios.get("/data/dataGet").then((res) => {
      setData(res.data);    
    });
  };

  const titleChange = (e)=>{
    e.preventDefault()
  
    if(e.target.value===''){axios.get("/data/dataGet").then((res) => {
      setData(res.data);    
    });}



    setTitle((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    let newArr = [];
    data.map((currentElement, index) => { 
      // if(currentElement.title===e.target.value)
      if (currentElement.title.indexOf(e.target.value) >= 0) 
      { newArr.push(currentElement)
        setitup(newArr)
       }
      // {newArr.push(currentElement)     
      else{
        console.log('not found')
      }
     
    }); 
  }
  const setitup = (newar)=>{
    setData(newar);
  }

  
  return (
    <div>
      {realUser.email ? (
        <h1>
          {realUser.firstName.charAt(0).toUpperCase() +
            realUser.firstName.slice(1)}
          's Titles
        </h1>
      ) : null}
       <TextField id="standard-basic" label="Sort Titles" name="title" onChange={titleChange} />
      <Button variant="contained" color="primary" onClick={ShowBlanks}>
        Show Nulls
      </Button>
      <Button variant="contained" color="primary" onClick={ShowAll}>
        Show All
      </Button>
      <DataSheetGrid data={data} onChange={setData} columns={columns} />
    </div>
  );
};

export default Titles;
