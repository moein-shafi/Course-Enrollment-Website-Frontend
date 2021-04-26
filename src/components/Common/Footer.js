import React from 'react';
import MetaTags from "react-meta-tags";
import "./Fonts/vazir-fonts/fonts.css";
import "./Fonts/flaticon.css";
import "./styles.css";


export default function Footer() {
    return(
        <div className="footer">
            <MetaTags>
                <title>Home</title>
                <meta charSet="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="stylesheet"href={"https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"}/>


                <script src={"https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"}/>
                <script src={"https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"}/>
                <script src={"https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"}/>
            </MetaTags>
                <div className="col-6">
                    <p className="name">
                        <i className="flaticon-copyright"/>
                        دانشگاه تهران - سامانه‌ی بلبلستان
                    </p>
                </div>

                <div className="col-6">
                    <p className="socials">
                        <i className="flaticon-facebook"/>
                        <i className="flaticon-instagram"/>
                        <i className="flaticon-linkedin-logo"/>
                        <i className="flaticon-twitter-logo-on-black-background"/>
                    </p>
                </div>
            </div>
    );
}