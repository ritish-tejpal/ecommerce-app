import axios from 'axios';

function handleLogin(props) {
    axios
    .post('http://127.0.0.1:8000/accounts/login/', {
        username: props.username,
        password: props.password
    })
    .then(res => {
        console.log(res);
        console.log(res.data);
    })
}

export default handleLogin;