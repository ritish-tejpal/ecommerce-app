import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserInformation() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/accounts/users/')
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
        <h1>User Information</h1>
        {userData.map((user) => (
          <>
            <p>User ID: {user.id}</p>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>Phone Number: {user.phone_number}</p><br />
          </>
        ))
        }
    </div>
  );
}

export default UserInformation;
