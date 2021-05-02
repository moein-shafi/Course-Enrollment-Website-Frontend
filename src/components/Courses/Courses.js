import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import MetaTags from 'react-meta-tags';
import Header from "../Common/Header";
import "./courses.css";
import "./../Common/styles.css";
import Footer from "../Common/Footer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactTooltip from 'react-tooltip';

const axios = require('axios').default;


class TableRow extends React.Component {

    deleteOffering(code)  {
        const response = axios.delete('http://localhost:8080/course', {
            params: {courseCode: code}
        })
            .then(response => {
                if (response.data.code === "200")
                {
                    toast.success(response.data.message);
                }
                else
                {
                    toast.error(response.data.message);
                }
                this.props.value.getCoursesDataReq();

            })
            .catch(function (error) {
                console.log(error);
            })
        // console.log(response);


    }
    render() {

        const {offering, getCoursesDataReq} = this.props.value;
        let status = "submited";
        let offeringResult = "ثبت شده" ;
        if (offering.wantsToRemove === true)
        {
            status = "removed";
            offeringResult = "حذف شده";
        }
        else if (offering.status === "Waiting")
        {
            status = "waiting";
            offeringResult = "در انتظار" ;

        }
        else if (offering.finalized === "non_finalized")
        {
            status = "not_submited";
            offeringResult = "ثبت نهایی نشده" ;
        }

        return (
            <tr>
                <td className="delete">
                    <button className="delete_button" onClick={() => this.deleteOffering(offering.course.code)}><i className="flaticon-trash-bin"/></button>
                </td>
                <td>
                    <div className="status" id={status}>{offeringResult}</div>
                </td>
                <td>{offering.course.code + "-" + offering.course.classCode}</td>
                <td>{offering.course.name}</td>
                <td>
                    <div>{offering.course.instructor}</div>
                </td>
                <td>
                    <div className="credit">{offering.course.units}</div>
                </td>
            </tr>
        );
    }
}

class SelectedCourses extends React.Component {

    constructor(props) {
        super(props);
        this.state = { value: []};
    }

    submitSelected(){
        const response = axios.post('http://localhost:8080/course', null,{
            params: {action: "submit"}
        })
            .then(response => {
                // console.log(response);
                if (response.data.code === "200")
                {
                    toast.success(response.data.message);
                }
                else
                {
                    toast.error(response.data.message);
                }
                this.props.value.getCoursesDataReq();

            })
            .catch(function (error) {
                console.log(error);
            })


    }

    refreshSelected(){
        const response = axios.post('http://localhost:8080/course', null,{
            params: {action: "reset"}
        })
            .then(response => {
                // console.log(response);
                if (response.data.code === "200")
                {
                    toast.success(response.data.message);
                }
                else
                {
                    toast.error(response.data.message);
                }
                this.props.value.getCoursesDataReq();

            })
            .catch(function (error) {
                console.log(error);
            })

    }


    componentWillReceiveProps(nextProps) {
        this.setState({ value: nextProps.value });
    }

    render() {
        const {courseData, getCoursesDataReq} = this.props.value;
        const {student} = courseData;
        let tableRows = []

        Object.keys(student.addedOfferings).forEach(function(key) {
            tableRows.push(<TableRow value={{offering:student.addedOfferings[key],
                getCoursesDataReq:getCoursesDataReq}} />);
        });


        return (
            <div className="selected_courses">
                <div className='label'>دروس انتخاب‌شده</div>
                        <table className="selected_table">
                            <tr>
                                <th className="row_id"></th>
                                <th>وضعیت</th>
                                <th>کد</th>
                                <th>نام درس</th>
                                <th>استاد</th>
                                <th>واحد</th>
                            </tr>
                            {tableRows}
                        </table>
                        <div className="submit">
                            <div className="col-6">
                                <div className="credits">تعداد واحد ثبت شده:
                                    {student.finalizedUnits}</div>
                            </div>
                            <div className="col-6">
                                <button onClick={() => this.refreshSelected()} type="button" id="revert"><i className="flaticon-refresh-arrow"></i></button>
                                <button onClick={() => this.submitSelected()} type="button" id="final_submit">ثبت نهایی</button>
                            </div>
                        </div>
                </div>


                );
    }
}


class OfferingRow extends React.Component {

    addCourse(code, classCode, hasCapacity){
        const response = axios.put('http://localhost:8080/course', null,{
            params: {courseCode: code, classCode: classCode, isWaiting:!hasCapacity}
        })
            .then(response => {
                // console.log(response);
                if (response.data.code === "200")
                {
                    toast.success(response.data.message);
                }
                else
                {
                    toast.error(response.data.message);
                }
                this.props.value.getCoursesDataReq();

            })
            .catch(function (error) {
                console.log(error);
            })

    }

    render() {
        const {offering, hasCapacity} = this.props.value;
        // console.log(this.props.value);
        let fullStatus = "full";
        if (offering.signedUp < offering.capacity){
            fullStatus = "not_full";
        }
        let status = "clock", statusIcon = "flaticon-clock-circular-outline";
        if (hasCapacity)
        {

            status = "normal";
            statusIcon = "flaticon-add";
        }
        let courseTypes = {"Takhasosi": "تخصصی",
            "Umumi": "عمومی",
            "Paaye": "پایه",
            "Asli": "اصلی",}
        console.log(offering.classDays);
        let tmp =  offering.classTime + "<br>" + offering.classDays[0] + "-" + offering.classDays[1];
        return (
            <tr data-tip={tmp}>
                <td className="action">
                    <button onClick={() => this.addCourse(offering.code, offering.classCode, hasCapacity)} className="action_button" id={status}><i className={statusIcon}/></button>
                </td>
                <td>{offering.code + "-" + offering.classCode}</td>
                <td>
                    <div className="capacity" id={fullStatus}>{offering.signedUp}/{offering.capacity}</div>
                </td>
                <td>
                    <div className="course_type" id={offering.type}>{courseTypes[offering.type]}</div>
                </td>
                <td>{offering.name}</td>
                <td>
                    <div>{offering.instructor}</div>
                </td>
                <td>
                    <div className="credit">{offering.units}</div>
                </td>
                <td className="description"/>
            </tr>
        );
    }
}


class OfferingsTable extends React.Component {

    render() {
        const {coursesData, courseType, keyword, getCoursesDataReq} = this.props.value;
        // console.log(this.props.value);
        let offeringRows = [];
        let courseTypes =
            {"Takhasosi": "ekhtesasi_courses",
            "Umumi": "general_courses",
            "Paaye": "basic_courses",
            "Asli": "main_courses"}
        if (coursesData && coursesData.allCourses)
        {
            Object.keys(coursesData.allCourses).forEach(function(key) {
                let offering = coursesData.allCourses[key];
                if (courseType === "all_courses" || courseType === courseTypes[offering.type] )
                {
                    if (offering.name.includes(keyword))
                        offeringRows.push(<OfferingRow value={{offering:offering,
                            hasCapacity:offering.signedUp < offering.capacity, getCoursesDataReq:getCoursesDataReq}} />);

                }

            });
        }
        return (
            <table className="offerings_table">
                <tr>
                    <th className="offering_status"/>
                    <th>کد</th>
                    <th>ظرفیت</th>
                    <th className="courses_type">نوع</th>
                    <th className="courses_name">نام درس</th>
                    <th className="courses_instructor">استاد</th>
                    <th>واحد</th>
                    <th className="description">توضیحات</th>
                </tr>

                {offeringRows}
            </table>
        );
    }
}

class Courses extends React.Component {

    constructor(props) {
        super(props);
        this.state = { profileData: [],
            coursesData: [],
            searchCourseType: "all_courses",
            searchKeyword: "",
            loading: false};
        this.getCoursesDataReq();
        this.searchCallable = null;
    }

    setChildCallables = (callables) => {
        this.searchCallable = callables;
    }
    componentDidUpdate(prevProps) {
        if (prevProps.id != this.props.id)
        {
            this.getCoursesDataReq();
        }
    }

    loadingTag = () => {
        console.log("loading", this.state.loading);
        if (this.state.loading)
        {
            return (
                <div className="loading" >
                    <div className="spinner-grow" role="status">
                    </div>
                </div>);}
        else {
            return null;
        }
    }

    getCoursesDataReq = () => {
        const getData = () => {
            axios.get('http://localhost:8080/course')
                .then(response => {
                    this.setState({coursesData: response.data});
                })
                .catch(function (error) {
                    console.log(error);
                });
        };
        getData();

    }

    search()
    {
        this.searchCallable(this.state.searchData);
    }

    render() {
        let res = this.state.coursesData;
        let status = res.code;

        if (status === 401){
            return <Redirect to={{pathname: "/login", state:{from: this.props.location}}} />
        }
        else if (status === 200) {

            let courseTypes = {"all_courses": "همه",
                            "ekhtesasi_courses": "اختصاصی",
                            "main_courses": "اصلی",
                            "basic_courses": "پایه",
                            "general_courses": "عمومی"};
            let textInput = React.createRef();
            return (
                <div className="container">
                    <MetaTags>
                        <title>Home</title>
                        <meta charSet="utf-8"/>
                        <meta name="viewport" content="width=device-width, initial-scale=1"/>
                        <link rel="stylesheet"href={"https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"}/>
                        <link rel="stylesheet" href="./../Common/styles.css"/>
                        <link rel="stylesheet" href="courses.css"/>
                        <link rel="stylesheet" href="./../Common/Fonts/flaticon.css"/>
                        <link rel="stylesheet" href="./../Common/Fonts/vazir-fonts/fonts.css"/>
                        <script src={"https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"}/>
                        <script src={"https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"}/>
                        <script src={"https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"}/>
                    </MetaTags>
                    {this.state.loading && (
                        <div className="loading" hidden="true" >
                            <div className="spinner-grow" role="status">
                            </div>
                        </div>)}
                    <div className="row">
                        <Header />
                    </div>
                    <div className="row" id="main">
                        <div class="col-12" id="main_col">
                            <SelectedCourses value={{courseData:this.state.coursesData,
                                                 getCoursesDataReq:this.getCoursesDataReq}} />
                            <div className="search">
                                <form action="" id="search_form">
                                    <input ref={textInput} type="text" id="course_name" name="course_name" placeholder="نام درس" /><br/>
                                        <button onClick={() => this.setState({searchKeyword:textInput.current.value})} type="button" className="search_button"> جستجو
                                            {"    "}

                                            <i className="flaticon-loupe"/></button>
                                </form>
                            </div>

                            <div class="offerings">
                                <div class='label'>دروس انتخاب‌شده</div>
                                <div class="courses_types">

                                    {Object.keys(courseTypes).map((i) =>
                                        <button onClick={() => this.setState({searchCourseType: i})}
                                                type="button" id={i} className={this.state.searchCourseType === i?"selected_button":"normal_button"}>{courseTypes[i]}</button>
                                    )}

                                </div>
                                <OfferingsTable value={{coursesData:this.state.coursesData,
                                    courseType: this.state.searchCourseType,
                                    keyword: this.state.searchKeyword, getCoursesDataReq:this.getCoursesDataReq}} />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <Footer />
                    </div>
                    <ReactTooltip
                        effect="solid" type="dark" place="left"
                            offset={{right:160}} multiline="true"/>

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

export default Courses;