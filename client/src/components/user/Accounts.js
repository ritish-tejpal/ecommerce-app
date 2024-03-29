import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Accounts = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [userProfile, setUserProfile] = useState({});

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token === null) {
            navigate("/auth/login");
        }
        axios.get("http://127.0.0.1:8000/accounts/profile/", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                setUser(response.data.user);
                setUserProfile(response.data.user_profile);                
            })
            .catch((error) => {
                console.log(error);
            });
    }, [navigate]);

    return (
        <div className="main">
            <h1>Accounts</h1>
            <div className="container">
                <div className="row">
                    <div className=" col-md-6">
                        <h3 className=" font-bold">User Information</h3>
                        {
                            Object.entries(user).map(([key, value]) => {
                                return <p key={key}>{key}: {value}</p>
                            })
                        }
                        <br />
                        {
                            Object.entries(userProfile).map(([key, value]) => {
                                return <p key={key}>{key}: {value}</p>
                            })
                        }
                    </div>
                </div>
            </div>
                
        </div>
    );
};

export default Accounts;
