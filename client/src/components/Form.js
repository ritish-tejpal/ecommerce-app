import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField, Button } from '@mui/material';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
    username: Yup.string().required('Username is required'),
    phone_number: Yup.string().required('Phone number is required')
});

const LoginForm = () => {
    const handleSubmit = (values) => {
        console.log('Form submitted with values:', values);
    };

    return (
        <Formik
            initialValues={{ email: '', password: '', username: '', phone_number: ''}}
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
                        fullWidth
                        helperText={<ErrorMessage name="email" />}
                    /> <br /><br />
                    <Field
                        as={TextField}
                        name="password"
                        type="password"
                        label="Password"
                        variant="outlined"
                        fullWidth
                        helperText={<ErrorMessage name="password" />}
                    />
                    <Field
                        as={TextField}
                        name="username"
                        type="username"
                        label="Username"
                        variant="outlined"
                        fullWidth
                        helperText={<ErrorMessage name="username" />}
                    />
                    <Field
                        as={TextField}
                        name="phone_number"
                        type="tel"
                        label="Phone number"
                        variant="outlined"
                        fullWidth
                        helperText={<ErrorMessage name="phone_number" />}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
                        fullWidth
                    >
                        Submit
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default LoginForm;
// ----------------------------------------------------------