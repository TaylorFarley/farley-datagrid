import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import axios from "axios";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function Preview(props) {
  const classes = useStyles();
  console.log(props.mydata);
  const [message, setMessage] = useState(false);
 

  const loadData = () => {
    console.log(props.mydata);
    axios.post("/data/dataAdd", props.mydata).then((x) => {
           if (x.status) setMessage(true);
   
    });
  };

  return (
    <React.Fragment>
      <h1>Preview</h1>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Log</TableCell>
              <TableCell align="right">Org</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.mydata.slice(0, 3).map((row) => (
              <TableRow key={row.title}>
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="right">{row.log}</TableCell>
                <TableCell align="right">{row.org}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={loadData}>Load File Now</Button>
      {message ? <h1>Loaded</h1> : null}
   
    </React.Fragment>
  );
}
