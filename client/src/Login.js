import React from "react";
import axios from "axios";

import Button from "@mui/material/Button";
import { TextField } from "@mui/material";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { setIsLoggedIn } from "./store";
import { useSelector, useDispatch } from "react-redux";


const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
});

const Login = () => {
    const handleSubmit = (values) => {
        axios.post("http://127.0.0.1:8000/accounts/login/", {
            username: values.username,
            password: values.password,
        })
        .then(async (response) => {
            console.log(response.data);

            // localStorage.setItem("token", response.data.access)
        })
        .catch(async (error) => { 
            console.log(error);
            return error.response;
        });
    };

    return (
        <div className="main">
            <h1>Login</h1>
            <Formik
                initialValues={{
                    username: "",
                    password: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field
                            as={TextField}
                            name="username"
                            type="text"
                            label="Username"
                            variant="outlined"
                            helperText={<ErrorMessage name="username" />}
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
                            sx={{ width: "50%", position: 'relative', left: '25%'}}
                            // disabled={isSubmitting}
                        >
                            Submit
                        </Button> <br /><br />
                    </Form>
                )}
            </Formik>
            <Button variant="contained" href="/signup">Don't have an account? Signup for free</Button>
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
