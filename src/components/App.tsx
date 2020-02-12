import React, { FunctionComponent } from 'react';
import './App.css';
import SignInView from "./SignInView/SignInView";

const App: FunctionComponent<{}> = () => {
    return (
        <div className="App">
            <div className="signin-view">
                <SignInView></SignInView>
            </div>
            <div className="dashboard-view"></div>
        </div>
    );
};


export default App;
