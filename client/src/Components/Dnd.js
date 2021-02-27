import React, { useCallback, useState } from "react";
import CSVReader from "react-csv-reader";

export default function Dnd() {
    let [mydata, setmydata] = useState()
    let fakedata
  const handleForce = (data, fileInfo) => {
      console.log(data, fileInfo)
    setmydata(data)
  };
console.log(typeof mydata)
if(mydata)
mydata.slice(0,3).map((x)=>{
    console.log(x.page)
})
  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.toLowerCase().replace(/\W/g, "_"),
  };

  return (
    <CSVReader
      cssClass="react-csv-input"
      onFileLoaded={handleForce}
      parserOptions={papaparseOptions}
    />
  );
}
