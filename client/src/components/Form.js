// import React, { useState } from "react";
// import TextField from "@mui/material/TextField";


// function Form(props){
     
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [email, setEmail] = useState('');
//     const [phone_number, setPhoneNumber] = useState('');

//     return(
//         <div>
//             <form method="post">
//                 <TextField
//                     id="outlined-basic"
//                     label="Enter your username"
//                     variant="outlined"
//                     name="username"
//                     type="username"
//                     value={username}
//                     onChange={e => setUsername(e.target.value)}
//                 /><br /><br />
//                 <TextField
//                     id="outlined-basic"
//                     label="Enter your password"
//                     variant="outlined"
//                     name="password"
//                     type="password"
//                     value={password}
//                     onChange={e => setPassword(e.target.value)}
//                 /><br /><br />
//                 {props.type==="signup" ? 
//                     <>
//                     <TextField
//                         id="outlined-basic"
//                         label="Enter your email"
//                         variant="outlined"
//                         name="email"
//                         type="email"
//                         value={email}
//                         onChange={e => setEmail(e.target.value)}
//                     /><br /><br />
//                     <TextField
//                     id="outlined-basic"
//                     label="Enter your phone number"
//                     variant="outlined"
//                     name="phone_number"
//                     type="tel"
//                     value={phone_number}
//                     onChange={e => setPhoneNumber(e.target.value)}
//                 /><br /><br />
//                    </> : null
//                 }
                
//             </form>
//         </div>
//     )
// }

// export default Form;


// ----------------------------------------------------------
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