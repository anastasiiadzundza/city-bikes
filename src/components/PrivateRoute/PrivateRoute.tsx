import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import {
    Route,
    Redirect,
} from "react-router-dom";

interface RootState {
    isSignedIn: boolean
}

interface Props {
    path: string,
}

const PrivateRoute: FunctionComponent<Props>  = ({children, ...rest}) => {
    
    const isSignedIn = useSelector((store: RootState) => {
        return store.isSignedIn;
    });
    
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