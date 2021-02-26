import React, {useContext, useState} from 'react';
import UserContext from "../Context/UserContext";
import ReactDOM from "react-dom";
import {
    DataSheetGrid,
    checkboxColumn,
    textColumn,
  } from 'react-datasheet-grid'
  import 'react-datasheet-grid/dist/index.css'

  
const Home = () => {
    const { realUser, setRealUser } = useContext(UserContext);

    const [ data, setData ] = useState([
        { title: 'Drama Movies', log: '', org: '' },
        { title: 'Funny Series', log: '', org: '' },
      ])
    
      const columns = [      
        textColumn({ title: 'Title', key: 'title' }),
        textColumn({ title: 'Log', key: 'log' }),
        textColumn({ title: 'Org', key: 'org' }),
      ]
    

    


    return (
        <div>
            <h1>HOME</h1>
               {realUser.email?(<>Hi {realUser.firstName}</>):null}
            <DataSheetGrid
      data={data}
      onChange={setData}
      columns={columns}
    />
        </div>
    );
};

export default Home;