import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        axios.post("http://127.0.0.1:8000/accounts/logout/", {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
        .then((response) => {
            console.log(response);
            localStorage.removeItem("token");
            localStorage.removeItem("refresh");
            navigate("/");
        })
        .catch((error) => {
            console.log(error);
        });
    }, [navigate]) 

    return (
        <div className=" container flex justify-center mx-auto shadow-md">
            <h1 className="font-bold">Logging out...</h1>
        </div>
    );
};

export default Logout;
