import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import './App.css';
import Login from '../Login/Login';
import Courses from "../Courses/Courses";
import Profile from "../Profile/Profile";
import Schedule from "../Schedule/Schedule";
import Signup from "../SignUp/Signup";
import Header from "../Common/Header";

class App extends React.Component{

    constructor(props) {
        super(props);
        this.state = {loading:false};
    }
    render() {
        const loadingTag = () => {
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

        const setLoading = (v) => {
            this.setState({loading: v});
        }

        return (
            <div className="wrapper">
                {loadingTag()}
                <BrowserRouter>
                    <Switch>
                        <Route path="/courses">
                            <div className="COURSES-DIV">
                                <Courses />
                            </div>
                        </Route>
                        <Route exact path="/">
                            <div className="PROFILE-DIV">
                                <Profile />
                            </div>
                        </Route>
                        <Route path="/schedule">
                            <Schedule />
                        </Route>
                        <Route path="/login">
                            <div className="LOGIN-DIV">
                                <Login />
                            </div>
                        </Route>

                        <Route path="/signup">
                            <div className="LOGIN-DIV">
                                <Signup />
                            </div>
                        </Route>
                        <Route path="/forget_pass">
                            <div className="LOGIN-DIV">
                                <h2> Forget Password</h2>
                            </div>
                        </Route>
                    </Switch>
                </BrowserRouter>
                <ToastContainer />
            </div>
        );
    }
}

export default App;