import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import './App.css';
import Login from '../Login/Login';
import Courses from "../Courses/Courses";
import Profile from "../Profile/Profile";
import Schedule from "../Schedule/Schedule";
import Header from "../Common/Header";

function App() {
    // const [loggedIn, setLoggedIn] = useState();
    // console.log("loggedIn: ", loggedIn)
    // if(!loggedIn) {
    //     return <Login setLoggedIn={setLoggedIn}/>
    // }

    return (
        <div className="wrapper">
            <BrowserRouter>
                <Switch>
                    <Route path="/courses">
                        <div className="COURSES-DIV">
                            <Courses />
                        </div>                    </Route>
                    <Route exact path="/">
                        <div className="PROFILE-DIV">
                            <Profile />
                        </div>
                    </Route>
                    <Route path="/schedule">
                        <Schedule />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                </Switch>
            </BrowserRouter>
            <ToastContainer />
        </div>
    );
}

export default App;