import React, { useState } from "react";
import handleLogin from "./auth/HandleLogin";
import handleSignup from "./auth/HandleSignup";

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
                <label >Enter your username
                    <input
                        name="username"
                        type="username" 
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </label><br /><br />
                <label>Enter your password
                    <input 
                        name="password"
                        type="password" 
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </label><br /><br />
                <button onClick={formType}>Submit</button>
            </form>
        </div>
    )
}

export default Form;