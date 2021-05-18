import React from 'react';
import MetaTags from "react-meta-tags";
import "./Fonts/vazir-fonts/fonts.css";
import "./Fonts/flaticon.css"
import "./styles.css";
import logo from "./logo.png";
import {toast} from "react-toastify";
import {Redirect} from "react-router-dom";
import { useHistory } from "react-router-dom";


const axios = require('axios').default;


export default function Header() {
    const history = useHistory();
    const logout = () =>
    {
        localStorage.setItem("token", "null");
        history.push("/login");

    }
    return(
        <div className="header">
            <MetaTags>
                <title>Home</title>
                <meta charSet="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="stylesheet"href={"https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"}/>
                <link rel="stylesheet" href="styles.css"/>
                <link rel="stylesheet" href="Fonts/flaticon.css"/>
                <link rel="stylesheet" href="Fonts/vazir-fonts/fonts.css"/>

                <script src={"https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"}/>
                <script src={"https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"}/>
                <script src={"https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"}/>
            </MetaTags>
                <div className="col-2">
                    <a href="/">
                    <img src={logo} id="logo-img"/>
                    </a>
                </div>
                <div className="col-6">
                    <div className="links">
                        <a href="/courses"> انتخاب واحد</a>
                        <a href="/schedule"> برنامه هفتگی</a>
                    </div>
                </div>
                <div className="col-4">
                    <a onClick={logout}>
                        <div className="logout">
                            خروج
                            <i className="flaticon-log-out"></i>
                        </div>
                    </a>
                </div>
            </div>
    );
}