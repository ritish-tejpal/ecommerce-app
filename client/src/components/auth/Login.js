import React from "react";
import axios from "axios";

import { Formik, Form, Field } from "formik";

import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const initialValues = {
        username: "",
        password: "",
    };

    const handleSubmit = (values) => {
        axios.post("http://127.0.0.1:8000/accounts/login/", {
                username: values.username,
                password: values.password,
            })
            .then((response) => {
                localStorage.setItem("token", response.data.data.access_token);
                localStorage.setItem(
                    "refresh",
                    response.data.data.refresh_token
                );
                navigate("/user/accounts");
            })
            .catch((error) => {
                console.log(error);
                return error.response;
            });
    };

    return (
        <div className="w-full max-w-md mx-auto my-12">
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {(formikProps) => (
                    <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <label
                                htmlFor="username"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Username
                            </label>
                            <Field
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Username"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-6">
                            <label
                                htmlFor="password"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Password
                            </label>
                            <Field
                                type="password"
                                id="password"
                                name="password"
                                placeholder="********"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                type="submit"
                                disabled={formikProps.isSubmitting}
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                {formikProps.isSubmitting
                                    ? "Signing In..."
                                    : "Sign In"}
                            </button>
                            <a
                                href="#"
                                className="inline-block align-baseline font-bold text-sm text-green-500 hover:text-green-800"
                            >
                                Forgot Password?
                            </a>
                        </div>
                    </Form>
                )}
            </Formik>
            <p className="text-center text-gray-500 text-xs">
                &copy;2024 Apan ka hai bey. All rights reserved.
            </p>
        </div>
    );
};

export default Login;
