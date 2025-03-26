import { useEffect } from "react";
import { Outlet,useNavigate } from "react-router";

export default function RouteProxy(props) {

    const navigate = useNavigate();
    useEffect(() => {
        navigate('/order')
    }, []);
    return (
        <Outlet />
    )
}