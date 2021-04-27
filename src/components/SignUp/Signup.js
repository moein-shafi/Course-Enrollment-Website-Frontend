import React, { useState } from 'react';
import './Signup.css';
import { useHistory } from "react-router-dom";

const axios = require('axios').default;

async function signup(credentials) {

    return null;

}


export default function Signup() {
    const [email, setEmail] = useState();
    const [name, setName] = useState();
    const [secondName, setSecondName] = useState();
    const [birthDate, setBirthDate] = useState();
    const [password, setPassword] = useState();
    const history = useHistory();


    const handleSubmit = async e => {

        e.preventDefault();
        const success = await signup({
            studentId:email,
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
                <h1>ثبت نام</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>ایمیل</p>
                    <input type="text" onChange={e => setEmail(e.target.value)} />
                </label>
                <label>
                    <p>نام</p>
                    <input type="text" onChange={e => setName(e.target.value)} />
                </label>
                <label>
                    <p>نام خانوادگی</p>
                    <input type="text" onChange={e => setSecondName(e.target.value)} />
                </label>
                <label>
                    <p>تاریخ تولد</p>
                    <input type="text" onChange={e => setBirthDate(e.target.value)} />
                </label>
                <label>
                    <p>رمز عبور</p>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                </label>
                <div>
                    <button type="submit">ثبت نام</button>
                </div>

                <div>
                    <a href="/login">ورود </a>
                </div>
            </form>
        </div>
    )
}
