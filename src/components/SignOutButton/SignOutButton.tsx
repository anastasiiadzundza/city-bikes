import React, { FunctionComponent } from 'react';
import * as actions from '../../store/actions/actions';
import './SignOutButton.scss';
import { Button, Icon } from 'semantic-ui-react';
import { GoogleLogout } from 'react-google-login';

import {
    useHistory,
} from "react-router-dom";
import {useDispatch} from "react-redux";

const SignOutButton: FunctionComponent<{}> = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    const signOut = () => {

        history.push("/signin");
        localStorage.clear();
        dispatch(actions.clearWidgetData());
    };
    const onFailure = () => {
        console.log('onFailure');
    };
    
    return (
        <GoogleLogout
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            render={renderProps => (
                <Button circular className="sign-out-button" icon onClick={renderProps.onClick} disabled={renderProps.disabled}>
                    <Icon name='sign-out'/>
                </Button>
            )}
            buttonText="Logout"
            onLogoutSuccess={signOut}
            onFailure={onFailure}
        >
        </GoogleLogout>
    );
};

export default SignOutButton;