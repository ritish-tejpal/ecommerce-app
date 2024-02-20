import React from "react";
import axios from "axios";

import Button from "@mui/material/Button";
import { TextField } from "@mui/material";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";


const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    username: Yup.string().required("Username is required"),
    phone_number: Yup.string().required("Phone number is required"),
});

const Signup = () => {
    const handleSubmit = (values) => {
        axios.post("http://127.0.0.1:8000/accounts/signup/", {
                email: values.email,
                password: values.password,
                username: values.username,
                phone_number: values.phone_number
            })
            .then((response) => {
                if(response.status === 200){
                    return(
                        <>
                            <h1>Signup successful</h1>
                            <Button href="/verify">Login</Button>
                        </>
                    )
                }
                else if(response.status === 400){
                    return(
                        <>
                            <h1>User already exists. Get a new verification OTP at this link</h1>
                            <Button href="/verify">Get OTP</Button>
                        </>
                    )
                }
            })
        }



    return (
        <div className="main">
            <h1>Signup</h1>
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                    username: "",
                    phone_number: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field
                            as={TextField}
                            name="email"
                            type="email"
                            label="Email"
                            variant="outlined"
                            helperText={<ErrorMessage name="email" />}
                        />{" "}
                        <br />
                        <br />
                        <Field
                            as={TextField}
                            name="password"
                            type="password"
                            label="Password"
                            variant="outlined"
                            helperText={<ErrorMessage name="password" />}
                        />{" "}
                        <br />
                        <br />
                        <Field
                            as={TextField}
                            name="username"
                            type="username"
                            label="Username"
                            variant="outlined"
                            helperText={<ErrorMessage name="username" />}
                        />{" "}
                        <br />
                        <br />
                        <Field
                            as={TextField}
                            name="phone_number"
                            type="tel"
                            label="Phone number"
                            variant="outlined"
                            helperText={<ErrorMessage name="phone_number" />}
                        />{" "}
                        <br />
                        <br />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting}
                            sx={{ width: "50%", position: 'relative', left: '25%'}}
                        >
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};


export default Signup;
