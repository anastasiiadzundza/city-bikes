import React, { useState, FunctionComponent, useEffect } from 'react';
import * as actions from '../../store/actions/actions';
import { useDispatch } from 'react-redux';
import './SignInButton.css';

const SignInButton: FunctionComponent<{}> = () => {
    const [err, setErr] = useState(null);
    let auth2;

    const dispatch = useDispatch();
     useEffect(() => {
        const successCallback = onSuccess;

        window.gapi.load('auth2', () => {
            auth2 = gapi.auth2.init({
                client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
            });
            auth2.then(() => {
                dispatch(actions.setIfSignedIn(auth2.isSignedIn.get()));
            });
    
            console.log(auth2);
        });

        window.gapi.load('signin2', () => {
            // Method 3: render a sign in button
            // using this method will show Signed In if the user is already signed in
            const opts = {
                width: 200,
                height: 50,
                client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                onsuccess: successCallback
            };
            gapi.signin2.render('loginButton', opts)
        });

    });

    const onSuccess = () => {
        dispatch(actions.setIfSignedIn(true));
        setErr(null);
    };
    
    // signOut = () => {
    //     this.auth2.signOut()
    // };
    
     return (
         <div className="signin-button">
             <button id="loginButton">SignIn</button>
         </div>
     );
};

export default SignInButton;