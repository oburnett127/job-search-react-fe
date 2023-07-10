import { useEffect, useState, useContext } from "react";
import { UserContext } from "./components/UserContext";

const PrivateRoute = ({ isLoggedIn, roleReq, children }) => {
    const { user } = useContext(UserContext);

    const authorize = () => {
        setLoading(true);

        const userRole = user.role;
        if(userRole === roleReq) setAuth(true);
        else setAuth(false);

        setLoading(false);
    }

    const [loading, setLoading] = useState(true);
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        if(isLoggedIn) authorize();
    })

    return loading ? (
        <h1>Loading...</h1>
    ) : auth ? children : (
        <p>You do not have access to the requested resource</p>
    );
};

export default PrivateRoute;
