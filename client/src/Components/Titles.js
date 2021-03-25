import React, { useContext, useState, useEffect } from "react";
import UserContext from "../Context/UserContext";
import ReactDOM from "react-dom";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
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
      setData(res.data);
      console.log(res.data);
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


  return (
    <div>
      {realUser.email ? (
        <h1>
          {realUser.firstName.charAt(0).toUpperCase() +
            realUser.firstName.slice(1)}
          's Titles
        </h1>
      ) : null}
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
