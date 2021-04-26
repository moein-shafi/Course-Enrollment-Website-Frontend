import React from 'react';
import MetaTags from "react-meta-tags";
import "./Fonts/vazir-fonts/fonts.css";
import "./Fonts/flaticon.css"
import "./styles.css";
import logo from "./logo.png";


export default function Header() {
    return(
        <div className="wrapper">
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
            <div className="header">
                <div className="col-2">
                    <img src={logo} id="logo-img"/>
                </div>
                <div className="col-6">
                    <div className="links">
                        <a href="/entekhab_vahed"> انتخاب واحد</a>
                        <a href="/barname"> برنامه هفتگی</a>
                    </div>
                </div>
                <div className="col-4">
                    <div className="logout">
                        خروج
                        <i className="flaticon-log-out"></i>
                    </div>
                </div>
            </div>
        </div>
    );
}