import React, { FunctionComponent, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import './App.scss';
import SignInView from "./SignInView/SignInView";
import Dashboard from "./Dashboard/Dashboard";
import signInService from './../services/sign-in.service';
import PrivateRoute from './PrivateRoute/PrivateRoute';

const App: FunctionComponent<{}> = () => {
    const [isLoading, setIsLoading] = useState(true);
    signInService().initGoogleAuth(setIsLoading);
    return (
        <Router>
            <Switch>
                <PrivateRoute path="/dashboard">
                    <Dashboard/>
                </PrivateRoute>
                <Route path="/signin">
                    <SignInView isLoading={isLoading} />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
