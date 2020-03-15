import React, { FunctionComponent } from 'react';
import SignInButton from '../SignInButton/SignInButton';
import './SignInView.scss';

const SignInView: FunctionComponent<{}> = () => {

    return (
        <div className="signin-view">
            <SignInButton></SignInButton>
        </div>
    )
};

export default SignInView;
