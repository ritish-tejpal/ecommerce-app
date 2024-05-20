import React from "react";
import axios from "axios";

// import Button from "@mui/material/Button";
// import { TextField } from "@mui/material";
import { Form, Field } from "formik";

import { useLocation } from "react-router-dom";

const Verify = () => {
    const location = useLocation();
    const email = location.state.email;

    const handleVerify = (values) => {
        console.log(location.state.email, values.otp)
        axios.post("http://127.0.0.1:8000/accounts/verify/", {
            email: this.state.email,
            otp: values.otp
        })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })        
    } 

    return (
    <div className="main">
        <h1>Verify</h1>
        <Form className="main" onSubmit={e => e.preventDefault()}>
            <Field
                variant='outlined'
                name='otp'
                type='text'
                label='Enter your OTP'
                placeholder='Enter your OTP'
            /> <br /><br />
            <button 
                type="submit"
                // variant="contained"
                color="primary"
                onClick={handleVerify}
            > Verify
            </button>
        </Form>
    </div>
    );
};

export default Verify;
