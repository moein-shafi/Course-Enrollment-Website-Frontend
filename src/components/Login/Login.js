import React, { useState } from 'react';
import './Login.css';
import {Redirect, useHistory} from "react-router-dom";
import {toast} from "react-toastify";

const axios = require('axios').default;

async function loginUser(credentials, history) {

    let token = axios.post('http://87.247.185.122:31123/login',
        {
        "email":credentials.email,
        "password":credentials.password
    },
        {
            "Content-Type": "application/json"
        })
        .then(response => {
            console.log(response);
            if (response.data.code === 200)
            {
                toast.success("You Logged in!");
                localStorage.setItem("token", response.data.token);
                history.push("/")
            }
            else
            {
                toast.error(response.data.message);
            }
        })
        .catch(function (error) {
            console.log("error :", error);
        });
    return token;

}



export default function Login({setJWT}) {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const history = useHistory();


    const handleSubmit = async e => {

        e.preventDefault();
        const token = await loginUser({
            email:email,
            password:password,
        }, history);
        if (email && token){
            localStorage.setItem("token", token);
            history.push("/");
        }

    }

    if (localStorage.getItem("token") !== null)
    {
        return <Redirect to={{pathname:"/"}}/>;
    }
    else
    {
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

}
