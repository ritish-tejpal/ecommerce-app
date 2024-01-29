// Create a login page for the user to enter their username and password using functional components

import React, { useState } from 'react';
import axios from 'axios';

function Login(props) {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    function postLogin() {
        axios.post('http://localhost:8000/login/', {
        username,
        password
        }).then(result => {
        if (result.status === 200) {
            setLoggedIn(true);
        } else {
            setIsError(true);
        }
        }).catch(e => {
        setIsError(true);
        });
    }
    
    if (isLoggedIn) {
        props.onLogin(true);
        return <div>Logged in!</div>;
    }
    
    return (
        <div>
        <input
            type="username"
            value={username}
            onChange={e => {
            setUsername(e.target.value);
            }}
            placeholder="username"
        />
        <input
            type="password"
            value={password}
            onChange={e => {
            setPassword(e.target.value);
            }}
            placeholder="password"
        />
        <button onClick={postLogin}>Sign In</button>
        {isError && <div>The username or password provided were incorrect!</div>}
        </div>
    );
}

export default Login;