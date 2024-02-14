import React from "react";
import axios from "axios";

import Button from "@mui/material/Button";
import { TextField } from "@mui/material";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { setIsLoggedIn } from "./store";
import { useSelector, useDispatch } from "react-redux";


const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
});

const Login = () => {
    
    const HandleLogin = () => {
        const dispatch = useDispatch();
        dispatch(setIsLoggedIn(true));
    };

    const Test = () => {
        const isLoggedIn = useSelector((state) => state.isLoggedIn);
        console.log(isLoggedIn);
    }

    const handleSubmit = (values) => {
        axios.post("http://127.0.0.1:8000/accounts/login/", {
            email: values.email,
            password: values.password,
        })
        .then(async (response) => {
            console.log(response.data);
            HandleLogin();
            // Test();
            // localStorage.setItem("token", response.data.access)
        })
        .catch(async (error) => { 
            console.log(error);
            return error.response;
        });
    };

    return (
        <div>
            <h1>Login</h1>
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
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            // disabled={isSubmitting}
                        >
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

// function Login() {
//     return (
//         <div>
//             <h1>Login</h1>
//             <Form type="login" />
//             <Button variant="contained" onClick={handleLogin}>Submit</Button>
//         </div>
//     );
// }

export default Login;
