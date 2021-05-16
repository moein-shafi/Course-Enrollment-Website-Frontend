import React, { useState } from 'react';
import './Login.css';
import { useHistory } from "react-router-dom";

const axios = require('axios').default;

async function loginUser(credentials) {

    return axios.post('http://localhost:8080/login', null,{
        params: {email: credentials.email, password: credentials.password}
    })
        .then(response => response.status === 200)
        .catch(function (error) {
            console.log(error);
        });

}


export default function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const history = useHistory();


    const handleSubmit = async e => {

        e.preventDefault();
        const success = await loginUser({
            email:email,
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
            <div className="login-label">
                <h1>لطفا وارد شوید</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>ایمیل</p>
                    <input type="text" onChange={e => setEmail(e.target.value)} />
                </label>
                <label>
                    <p>رمز عبور</p>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                </label>
                <div>
                    <button type="submit">ورود</button>
                </div>

                <div>
                    <a href="/signup">ثبت نام </a> |
                    <a href="/forget_pass"> فراموشی رمز عبور</a>
                </div>
            </form>
        </div>
    )
}
