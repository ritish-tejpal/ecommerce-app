import React, { useState } from 'react';
import axios from 'axios';
import Form from './components/Form';

function Login(props) {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');
    
    // function postLogin() {
    //     axios
    //     .post('http://localhost:8000/accounts/login/', {
    //     username,
    //     password
    //     })
        
    //     .then(result => {
    //     if (result.status === 200) {
    //         setLoggedIn(true);
    //     } else {
    //         setIsError(true);
    //     }
    //     })
        
    //     .catch(e => {
    //     setIsError(true);
    //     });
    // }
    
    // if (isLoggedIn) {
    //     props.onLogin(true);
    //     return <div>Logged in!</div>;
    // }
    
    return (
        <div>
            <h1>Login</h1>
            <Form type="login" />
        </div>
    );
}

export default Login;