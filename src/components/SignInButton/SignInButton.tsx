import React, { FunctionComponent } from 'react';
import './SignInButton.scss';
import {
    useHistory,
    useLocation
} from "react-router-dom";
import GoogleLogin from 'react-google-login';

const SignInButton: FunctionComponent<{}> = () => {
    
    let history = useHistory();
    let location = useLocation();

    let {from} = location.state || {from: {pathname: "/dashboard"}};
    
    const onSuccess = (googleUser) => {
        localStorage.setItem('userId', googleUser.getId());
        history.replace(from);
    };

    const onFailure = () => {

    };

    return (
        <div className="signin-button">
            <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Sign in"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    );
};

export default SignInButton;