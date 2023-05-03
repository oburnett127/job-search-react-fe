import { Navigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "./components/UserContext";
import axios from "axios";

const PrivateRoute = ({ isLoggedIn, roleReq, children }) => {
    const { userId } = useContext(UserContext);

    const authorize = () => {
        setLoading(true);

        axios({
            method: 'get',
            url: `http://localhost:8080/auth/getrole/${userId}`
        }).then(({ data }) => {
            if(data) {
                const userRole = data;
                if(userRole === roleReq) setAuth(true);
                else setAuth(false);
            } else {
                setAuth(false);
            }

            setLoading(false);
        }).catch((error) => {
            console.log(error);
            setLoading(false);
        })
    }

    const [loading, setLoading] = useState(true);
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        if(isLoggedIn) authorize();
    })

    return loading ? (
        <h1>Loading...</h1>
    ) : auth ? children : (
        <Navigate to="/" />
    );
};

export default PrivateRoute;
