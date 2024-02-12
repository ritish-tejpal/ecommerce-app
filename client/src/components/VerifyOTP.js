import React from "react";
import axios from "axios";

import Button from "@mui/material/Button";
import { TextField } from "@mui/material";

const VerifyOTP = () => {
    const handleVerify = (values) => {
        axios.post("http://127.0.0.1:8000/accounts/verify/", {
            otp: values.otp
        }, {
            headers: `Bearer ${access_token}`
        }
        
        )
    }

    return (
    <div>

    </div>
    );
};

export default VerifyOTP;
