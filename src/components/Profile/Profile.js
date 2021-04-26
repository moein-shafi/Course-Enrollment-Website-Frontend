import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import MetaTags from 'react-meta-tags';
import Header from "../Common/Header";
import "./Profile.css";
import "./../Common/styles.css";
import cover_photo from "./cover photo.jpg"
import Footer from "../Common/Footer";


const axios = require('axios').default;


class InfoBar extends React.Component {

    render() {
        const {student} = this.props.coursesData;
        return (
            <div className="info_bar">
            <div className="student_details">
                <img src={student.img} className="profile_pic"/>
                    <p>
                        <span className="key">نام: </span>
                        {student.name + " " + student.secondName}
                    </p>

                    <p>
                        <span className="key">شماره دانشجویی: </span>
                        {student.studentId}
                    </p>

                    <p>
                        <span className="key">تاریخ تولد: </span>
                        {student.birthDate}
                    </p>

                    <p>
                        <span className="key">معدل کل: </span>
                        {student.gpa}
                    </p>

                    <p>
                        <span className="key">واحد‌ گذرانده: </span>
                        {student.totalPassedUnits}
                    </p>

                    <p>
                        <span className="key">دانشکده: </span>
                        {student.faculty}
                    </p>

                    <p>
                        <span className="key">رشته: </span>
                        {student.field}
                    </p>

                    <p>
                        <span className="key">مقطع: </span>
                        {student.level}
                    </p>

                    <p>
                        <span className="status">
                            {student.status}

                        </span>
                    </p>
            </div>
        </div>);
    }
}

class KarnameRow extends React.Component {

    render() {
        let {key, grade, allCourses, id} = this.props.value;
        // console.log(allCourses);
        let status = "pass";
        let courseResult = "قبول";
        if (grade === null){
            grade = "--";
            status = "unknown";
            courseResult = "نامشخص";

        }
        if (grade < 10)
        {
            status = "fail";
            courseResult = "مردود";

        }
        return (

            <tr className="karname_row">
                <td className="row_id">{id}</td>
                <td>{key}</td>
                <td>
                    {Object.entries(allCourses).map(([k, value]) => {
                        return (
                            (key === value.code && value.code)?value.name:null
                    );})}

                </td>
                <td>{Object.entries(allCourses).map(([k, value]) => {
                    return (
                        (key === value.code && value.code)?value.units:null
                    );})}

                    واحد
                 </td>
                <td>
                    <div className="status" id={status}>{courseResult}</div>
                </td>
                <td>

                    <div className="score" id={status}>{grade}</div>
                </td>
            </tr>
        );
    }
}


class Karname extends React.Component {

    render() {
        let rowCounter = 0;
        let karnameRows = [];
        const {term, grades, gpa, allCourses} = this.props.value;
        Object.keys(grades).forEach(function(key) {
            rowCounter += 1;
            karnameRows.push(<KarnameRow value={{key:key, grade: grades[key], allCourses:allCourses, id:rowCounter}}/>);
        });
        return (
            <div className="karname">
                <div className='label'>  کارنامه - ترم
                    {term}
                </div>
                <br/>
                    <table className="karname_table">
                        {karnameRows}

                    </table>
                    <div className="GPA">معدل:
                        {gpa}
                    </div>
            </div>
        );
    }
}

class Transcript extends React.Component {
    render() {
        console.log(this.props.coursesData)

        const {student, allCourses} = this.props.coursesData;
        // console.log(allCourses);
        const {termGrades, termGpa} = student;
        var transcripts = [];

        Object.keys(termGrades).forEach(function(key) {
            transcripts.push(<Karname value={{term:key, grades:termGrades[key], gpa:termGpa[key], allCourses:allCourses}} />);
        });
        return (
            <div className="transcript">
                {transcripts}
            </div>
        );
    }
}

class Profile extends React.Component {


    constructor(props) {
        super(props);
        this.state = { profileData: [],
                       coursesData: []};
        //     .then(response => this.setState({ profileData: response.data }));
        const getCoursesDataReq = async () => {
            try {
                const response = await axios.get('http://localhost:8080/course');
                this.setState({ coursesData: response.data });

            }
            catch (err)
            {
                console.log(err);
            }
        }
        getCoursesDataReq();
    }

    render() {

        let res = this.state.coursesData;
        let status = res.code;

        if (status === 401){
            // return(
            //     <h2>Ridi</h2>
            // );
            return <Redirect to={{pathname: "/login", state:{from: this.props.location}}} />
        }
        else if (status === 200)
        {
            return (
                <div className="container">
                    <MetaTags>
                        <title>Home</title>
                        <meta charSet="utf-8"/>
                        <meta name="viewport" content="width=device-width, initial-scale=1"/>
                        <link rel="stylesheet"href={"https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"}/>
                        <link rel="stylesheet" href="./../Common/styles.css"/>
                        <link rel="stylesheet" href="./Profile.css"/>
                        <link rel="stylesheet" href="./../Common/Fonts/flaticon.css"/>
                        <link rel="stylesheet" href="./../Common/Fonts/vazir-fonts/fonts.css"/>
                        <script src={"https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"}/>
                        <script src={"https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"}/>
                        <script src={"https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"}/>
                    </MetaTags>
                        <div className="row">
                            <Header />
                        </div>
                        <div className="row" id="cover">
                            <div className="col-sm">
                                <div className="fill">
                                    <img src={cover_photo} id="cover_photo"/>
                                        <a className="prev">&#10095;</a>
                                        <a className="next">&#10094;</a>
                                </div>

                                <div className="dots">
                                    <span className="dot"/>
                                    <span className="dot-active"/>
                                </div>
                            </div>


                        </div>
                        <div className="row" id="main">
                            <div className="col-md-4">
                                <InfoBar coursesData={this.state.coursesData} />
                            </div>
                            <div className="col-md-8">
                                <Transcript coursesData={this.state.coursesData}/>
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
                <h2>Courses</h2>
        );
        }
    }
}

export default Profile;