import React, { FunctionComponent } from 'react';
import './SignOutButton.scss';
import { Button, Icon } from 'semantic-ui-react';
import googleService from '../../services/google.service';
import {
    useHistory,
} from "react-router-dom";

const SignOutButton: FunctionComponent<{}> = () => {

    const history = useHistory();

    const signOut = () => {
        googleService().signOut()
            .then(() => {
                history.push("/signin");
                localStorage.removeItem('userId');
            });
    };
    
    return (
        <Button circular className="sign-out-button" icon onClick={signOut}>
            <Icon name='sign-out'/>
        </Button>
    );
};

export default SignOutButton;