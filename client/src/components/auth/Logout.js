import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token === null) {
            navigate("/login");
        }
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
    }, [navigate]) // Include 'navigate' in the dependency array

    return (
        <div>

        </div>
    );
};

export default Logout;
