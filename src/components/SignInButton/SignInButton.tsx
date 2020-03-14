import React, { FunctionComponent, useEffect } from 'react';
import * as actions from '../../store/actions/actions';
import {useDispatch} from 'react-redux';
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
    
    const dispatch = useDispatch();
    
    useEffect(() => {
        googleService().renderSignInButton(onSuccess);
    }, []);
    
    const onSuccess = (googleUser) => {
        localStorage.setItem('userId',googleUser.getId());
        history.replace(from);
    };
    
    return (
        <div className="signin-button">
            <button id="login-button"></button>
        </div>
    );
};

export default SignInButton;