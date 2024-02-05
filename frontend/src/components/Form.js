import React, { useState } from "react";
import handleLogin from "./auth/HandleLogin";
import handleSignup from "./auth/HandleSignup";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';


function Form(props){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    function formType(e){
        e.preventDefault();
        if(props.type==="login"){
            handleLogin(username, password);
        }
        else if(props.type==="signup"){
            handleSignup(username, password);
        }
    }
        

    return(
        <div>
            <form method="post" action={formType}>
                <TextField
                    id="outlined-basic"
                    label="Enter your username"
                    variant="outlined"
                    name="username"
                    type="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                /><br /><br />
                <TextField
                    id="outlined-basic"
                    label="Enter your password"
                    variant="outlined"
                    name="password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                /><br /><br />
                <Button variant="contained" onClick={formType}>Submit</Button>
            </form>
        </div>
    )
}

export default Form;