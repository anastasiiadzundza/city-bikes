import React, { FunctionComponent } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import './App.scss';
import SignInButton from "./SignInButton/SignInButton";
import Dashboard from "./Dashboard/Dashboard";
import PrivateRoute from './PrivateRoute/PrivateRoute';

const App: FunctionComponent<{}> = () => {
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
                    <SignInButton></SignInButton>
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
