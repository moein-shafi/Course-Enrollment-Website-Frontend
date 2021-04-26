import React, { useState } from 'react';
import './Login.css';
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Profile from "../Profile/Profile";

const axios = require('axios').default;

async function loginUser(credentials) {

    return axios.post('http://localhost:8080/login', null,{
        params: {studentId: credentials.studentId}
    })
        .then(response => response.status === 200)
        .catch(function (error) {
            console.log(error);
        });

}


export default function Login() {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const history = useHistory();


    const handleSubmit = async e => {

        e.preventDefault();
        const success = await loginUser({
            studentId:username,
            password:password,
        });
        console.log(success);
        if (success)
        {
            history.push("/");
        }
    }

    return(
        <div className="login-wrapper">
            <h1>Please Log In</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input type="text" onChange={e => setUserName(e.target.value)} />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}
