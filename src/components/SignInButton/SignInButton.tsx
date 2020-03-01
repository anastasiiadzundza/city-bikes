import React, { FunctionComponent, useEffect } from 'react';
import * as actions from '../../store/actions/actions';
import {useDispatch} from 'react-redux';
import './SignInButton.scss';
import signInService from './../../services/sign-in.service';
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
        signInService().renderSignInButton(onSuccess);
    });
    
    const onSuccess = () => {
        dispatch(actions.setIfSignedIn(true));
        dispatch(actions.getCompanies());
        history.replace(from);
    };
    
    return (
        <div className="signin-button">
            <button id="login-button"></button>
        </div>
    );
};

export default SignInButton;