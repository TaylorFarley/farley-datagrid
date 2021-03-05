import React, { useCallback, useState } from "react";
import CSVReader from "react-csv-reader";
import Preview from './Preview'

export default function Import() {
    let [mydata, setmydata] = useState()
   
  const handleForce = (data, fileInfo) => {
      console.log(data, fileInfo)
       setmydata(data)
  };



  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.toLowerCase().replace(/\W/g, "_"),
  };

  return (
    <React.Fragment>
    <CSVReader
      cssClass="react-csv-input"
      onFileLoaded={handleForce}
      parserOptions={papaparseOptions}
    />
    {mydata?(<Preview mydata={mydata} />):null}
  
    </React.Fragment>
  );
}
