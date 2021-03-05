import React, { useCallback, useState } from "react";
import CSVReader from "react-csv-reader";


export default function Import() {
    let [mydata, setmydata] = useState()
   
  const handleForce = (data, fileInfo) => {
      console.log(data, fileInfo)
       setmydata(data)
  };

  //my stuff

if(mydata)
mydata.slice(0,3).map((x)=>{
    console.log(x.page)
})
 //end of my stuff

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
