import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import {
    Route,
    Redirect,
} from "react-router-dom";

interface Props {
    path: string,
}

const PrivateRoute: FunctionComponent<Props>  = ({children, ...rest}) => {
    
    const isSignedIn = localStorage.getItem('userId');
    
    return (
        <Route {...rest} render={({location}) => isSignedIn ? (children) : (
            <Redirect to={{
                pathname: "/signin",
                state: { from: location }
            }}/>
        )}/>
    )
};

export default PrivateRoute