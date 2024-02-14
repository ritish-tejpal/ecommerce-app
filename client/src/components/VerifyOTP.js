import React from "react";
import axios from "axios";

import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { Form, Field } from "formik";

const VerifyOTP = () => {
    const handleVerify = (values) => {
        axios.post("http://127.0.0.1:8000/accounts/verify/", {
            otp: values.otp
        })
        
    } 

    return (
    <div>
        <Form>
            <Field 
                as={TextField}
                variant='outlined'
                name='otp'
                type='number'
                label='Enter your OTP'
                placeholder='Enter your OTP'
            /> <br /><br />
            <Button 
                type="submit"
                variant="contained"
                color="primary"
            > Verify 
            </Button>
        </Form>
    </div>
    );
};

export default VerifyOTP;
