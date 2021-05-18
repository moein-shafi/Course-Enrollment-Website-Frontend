import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import MetaTags from 'react-meta-tags';
import Header from "../Common/Header";
import "./Schedule.css";
import "./../Common/styles.css";
import Footer from "../Common/Footer";


const axios = require('axios').default;


function TimeCell(props) {

    const courseTypes = {
        "Asli": "اصلی",
        "Paaye": "پایه",
        "Takhasosi": "اختصاصی",
        "Umumi": "عمومی",
    }


    if (props.data)
    {
        let duration = 0;
        const times = props.data.time.split("-");
        const start = times[0].split(":");
        const end = times[1].split(":");
        duration -= parseInt(start[0]);
        duration -= parseInt(start[1])/60;
        duration += parseInt(end[0]);
        duration += parseInt(end[1])/60;
        return (
            <div className={"class_time " + props.data.courseType} style={{height: 100*duration+"%", top:100*(parseInt(start[1])/60) + "%"}}>
                <div>{props.data.time}</div>
                <div className="courseName"><p>{props.data.name}</p></div>
                <div>{courseTypes[props.data.courseType]}</div>
            </div>
        );
    }
    else {
        return (
            <div className={"class_time"}>

            </div>
        );
    }

}

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = { profileData: []};
        const getProfileDataReq = async () => {
            try {
                const response = await axios.get('http://localhost:8080/profile', {headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        'Content-Type': 'application/json'
                    }
                });
                this.setState({ profileData: response.data });
            }
            catch (err)
            {
                console.log(err);
            }
        }
        getProfileDataReq();
    }

    render() {


        let res = this.state.profileData;
        let status = res.code;

        if (status === 401){
            return <Redirect to={{pathname: "/login", state:{from: this.props.location}}} />
        }
        else if (status === 200)
        {
            let tableItems = {};
            for (let i=7; i<18; i=i+1){
                tableItems[i] = {};
                for (let j=0; j<6; j=j+1){
                    tableItems[i][j] = null;
                }
            }

            const weekdayDic = {
                "Saturday": 0,
                "Sunday": 1,
                "Monday": 2,
                "Tuesday": 3,
                "Wednesday": 4,
                "Thursday": 5};



            console.log(tableItems);
            Object.values(this.state.profileData.student.addedOfferings).forEach(
                function(value) {
                    if (value.finalized === "finalized")
                    {
                        value.course.classDays.forEach(
                            function (day) {
                                const f = {
                                    name: value.course.name,
                                    time: value.course.classTime,
                                    day: day,
                                    courseType: value.course.type
                                }
                                tableItems[parseInt(f.time.substring(0, 3))][weekdayDic[day]] = JSON.parse(JSON.stringify(f));
                            }
                        )
                    }

                }
            );


            return (
                <div className="container">
                    <MetaTags>
                        <title>Home</title>
                        <meta charSet="utf-8"/>
                        <meta name="viewport" content="width=device-width, initial-scale=1"/>
                        <link rel="stylesheet"href={"https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"}/>
                        <link rel="stylesheet" href="./../Common/styles.css"/>
                        <link rel="stylesheet" href="./Schedule.css"/>
                        <link rel="stylesheet" href="./../Common/Fonts/flaticon.css"/>
                        <link rel="stylesheet" href="./../Common/Fonts/vazir-fonts/fonts.css"/>
                        <script src={"https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"}/>
                        <script src={"https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"}/>
                        <script src={"https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"}/>
                    </MetaTags>
                    <div className="row">
                        <Header />
                    </div>
                    <div class="row" id="main">
                        <div class="col-12" id="main_col">
                        <div class="schedule">
                            <div class="schedule_header">
                                <div class="col-6">
                                    <div class="weekly_label"><span><i class="flaticon-calendar"></i></span> برنامه هفتگی </div>
                                </div>
                                <div class="col-6">
                                    <div class="Term"> ترم ۶ </div>
                                </div>
                            </div>

                            <table class="schedule_table" >
                                <tr>
                                    <td></td>
                                    <td>شنبه</td>
                                    <td>یک‌‌شنبه</td>
                                    <td>دوشنبه</td>
                                    <td>سه‌شنبه</td>
                                    <td>چهارشنبه</td>
                                    <td>پنج‌شنبه</td>
                                </tr>

                                {
                                    Object.keys(tableItems).map(
                                        function (key){
                                            return (
                                                <tr>
                                                <td>{key}:00 - {parseInt(key)+1}:00</td>
                                                    {
                                                        Object.keys(tableItems[key]).map(function (day){
                                                            return (
                                                                <td>
                                                                    <TimeCell data={tableItems[key][day]}/>
                                                                </td>
                                                            );})
                                                    }
                                                </tr>
                                                );
                                        }
                                    )
                                }
                                                </table>


        </div>
        </div>
        </div>



            <div className="row">
                        <Footer />
                    </div>
                </div>
            );
        }
        else {
            return (
                <h2>404</h2>
            );
        }
    }
}

export default Profile;