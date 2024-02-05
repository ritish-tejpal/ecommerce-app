import axios from "axios";

function handleSignup(){
    axios.post('http://127.0.0.1:8000/accounts/signup/', {
        username: 'username',
        email: 'email',
        password: 'password',
        phone_number: 'phone_number'
    })
}

export default handleSignup;