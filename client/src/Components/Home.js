import React, {useContext} from 'react';
import UserContext from "../Context/UserContext";
const Home = () => {
    const { realUser, setRealUser } = useContext(UserContext);
    return (
        <div>
            <h1>HOME</h1>
               {realUser.email?(<>Hi {realUser.firstName}</>):null}
        </div>
    );
};

export default Home;