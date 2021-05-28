import React, { useState } from 'react';
import './Signup.css';
import {Redirect, useHistory} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

const axios = require('axios').default;

async function signup(credentials, history) {

    axios.post('http://localhost:8080/signup',
        {
            "email":credentials.email,
            "password":credentials.password,
            "firstName":credentials.name,
            "secondName":credentials.secondName,
            "birthDate":credentials.birthDate,
            "faculty":credentials.faculty,
            "studentId":credentials.SID,
            "field":credentials.field,
            "level":credentials.level
        },
        {
            "Content-Type": "application/json"
        })
        .then(response => {
            console.log(response);
            if (response.data.code === 200)
            {
                toast.success("You Signed up!");
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

}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export default function Signup() {
    const [email, setEmail] = useState();
    const [name, setName] = useState();
    const [secondName, setSecondName] = useState();
    const [birthDate, setBirthDate] = useState();
    const [password, setPassword] = useState();
    const [faculty, setFaculty] = useState();
    const [SID, setSID] = useState();
    const [field, setField] = useState();
    const [level, setLevel] = useState();
    const history = useHistory();


    const handleSubmit = async e => {

        e.preventDefault();

        if (!(email) && !(password) && !(name) &&
            !(secondName) && !(birthDate) && !(faculty) &&
            !(SID) && !(field) && !(level)) {
            toast.error("ورودی‌ها نباید خالی باشند.!")
            return;
        }
        if (!validateEmail(email))
        {
            toast.error("فرمت ایمیل درست نیست!")
            return;
        }
        const success = await signup({
            email: email,
            password: password,
            name: name,
            secondName: secondName,
            birthDate: birthDate,
            faculty: faculty,
            SID: SID,
            field: field,
            level: level,
        }, history);
        console.log(success);
        if (success) {
            history.push("/");
        }


    }
    if (localStorage.getItem("token") !== null)
    {
        return <Redirect to={{pathname:"/"}}/>;
    }
    else {
        return (
            <div className="login-wrapper">
                <div className="login-label">
                    <h1>ثبت نام</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div class="row">

                        <div class="column">
                            <label>
                                <p>ایمیل</p>
                                <input type="text" onChange={e => setEmail(e.target.value)}/>
                            </label>

                            <label>
                                <p>نام</p>
                                <input type="text" onChange={e => setName(e.target.value)}/>
                            </label>

                            <label>
                                <p>تاریخ تولد</p>
                                <input type="text" onChange={e => setBirthDate(e.target.value)}/>
                            </label>

                            <label>
                                <p>دانشکده</p>
                                <input type="text" onChange={e => setFaculty(e.target.value)}/>
                            </label>

                        </div>

                        <div className="column">
                            <label>
                                <p>رمز عبور</p>
                                <input type="password" onChange={e => setPassword(e.target.value)}/>
                            </label>

                            <label>
                                <p>نام خانوادگی</p>
                                <input type="text" onChange={e => setSecondName(e.target.value)}/>
                            </label>

                            <label>
                                <p>شماره دانشجویی</p>
                                <input type="text" onChange={e => setSID(e.target.value)}/>
                            </label>

                            <label>
                                <p>رشته</p>
                                <input type="text" onChange={e => setField(e.target.value)}/>
                            </label>


                        </div>



                    </div>
                    <label>
                        <p>مقطع</p>
                        <input type="text" onChange={e => setLevel(e.target.value)}/>
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
}
