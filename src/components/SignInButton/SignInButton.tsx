import React, { FunctionComponent, useEffect } from 'react';
import './SignInButton.scss';
import googleService from '../../services/google.service';
import {
    useHistory,
    useLocation
} from "react-router-dom";

const SignInButton: FunctionComponent<{}> = () => {
    
    let history = useHistory();
    let location = useLocation();

    let {from} = location.state || {from: {pathname: "/dashboard"}};

    useEffect(() => {
        googleService().renderSignInButton(onSuccess);
    });
    
    const onSuccess = (googleUser) => {
        localStorage.setItem('userId', googleUser.getId());
        history.replace(from);
    };
    
    return (
        <div className="signin-button">
            <button id="login-button"></button>
        </div>
    );
};

export default SignInButton;