import React, { FunctionComponent } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import './App.scss';
import SignInView from "./SignInView/SignInView";
import Dashboard from "./Dashboard/Dashboard";
import googleService from '../services/google.service';
import PrivateRoute from './PrivateRoute/PrivateRoute';

const App: FunctionComponent<{}> = () => {
    googleService().initGoogleAuth();
    return (
        <Router>
            <Switch>
                <Route path="/" exact render={({location}) => (
                    <Redirect to={{
                        pathname: "/dashboard",
                        state: { from: location }
                    }}/>
                )}/>
                <PrivateRoute path="/dashboard">
                    <Dashboard/>
                </PrivateRoute>
                <Route path="/signin">
                    <SignInView/>
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
