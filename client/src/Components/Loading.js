import { useState } from "react";
import { css } from "@emotion/core";
import BounceLoader from "react-spinners/BounceLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function Loading() {


  return (
    <div className="sweet-loading">
    
      

      <BounceLoader css={override} color={"#add8e6"} size={"150"}/>
      Loading...
    </div>
  );
}

export default Loading;