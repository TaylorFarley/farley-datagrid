import React, { useContext, useState, useEffect } from "react";
import UserContext from "../Context/UserContext";
import ReactDOM from "react-dom";
import axios from 'axios'
import {
  DataSheetGrid,
  checkboxColumn,
  textColumn,
} from "react-datasheet-grid";
import "react-datasheet-grid/dist/index.css";

const Titles = () => {
  const { realUser, setRealUser } = useContext(UserContext);

  const [data, setData] = useState();

  const columns = [  
    textColumn({ title: "Title", key: "title" }),
    textColumn({ title: "Log", key: "log" }),
    textColumn({ title: "Org", key: "org" }),
  ];

  useEffect(() => {
    axios.get("/data/dataGet").then((res) => {
    setData(res.data)
    console.log(res.data)
    });
  }, []);

  useEffect(() => {
    axios.post("/data/dataSend", data).then((res) => {
   console.log(res)
    });
  }, [data]);

  


  return (
    <div>
   
      {realUser.email ? <h1>{realUser.firstName.charAt(0).toUpperCase()+ realUser.firstName.slice(1)}'s Titles</h1> : null}
      <DataSheetGrid data={data} onChange={setData} columns={columns} />
    </div>
  );
};

export default Titles;
