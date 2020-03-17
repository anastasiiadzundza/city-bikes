import React, { FunctionComponent } from 'react';
import * as actions from '../../store/actions/actions';
import './SignOutButton.scss';
import { Button, Icon } from 'semantic-ui-react';
import googleService from '../../services/google.service';
import {
    useHistory,
} from "react-router-dom";
import {useDispatch} from "react-redux";

const SignOutButton: FunctionComponent<{}> = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    const signOut = () => {
        googleService().signOut()
            .then(() => {
                history.push("/signin");
                localStorage.clear();
                dispatch(actions.clearWidgetData());
            });
    };
    
    return (
        <Button circular className="sign-out-button" icon onClick={signOut}>
            <Icon name='sign-out'/>
        </Button>
    );
};

export default SignOutButton;