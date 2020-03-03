import React, { FunctionComponent, useState } from 'react';
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
    const [isLoading, setIsLoading] = useState(true);
    googleService().initGoogleAuth(setIsLoading);
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
                    <SignInView isLoading={isLoading} />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;