import axios from "axios";
import { useState } from "react";


function HandleSignup(){

    const [publicToken, setPublicToken] = useState('');

    axios.post('http://127.0.0.1:8000/o/token/', {
        username: 'username',
        email: 'email',
        password: 'password',
        phone_number: 'phone_number'
    }).then(response => {

        console.log(response);
    })
}

export default HandleSignup;