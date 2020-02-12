import React, {FunctionComponent} from 'react';
import SignInButton from './../SignInButton/SignInButton';
import {useSelector} from 'react-redux';

interface RootState {
    isSignedIn: boolean
}

const App: FunctionComponent<{}> = () => {
    const isSignedIn = useSelector((store: RootState) => {
        console.log(store);
        return store.isSignedIn;
    });

    if (!isSignedIn) {
        return <SignInButton></SignInButton>
    } else {
        return <p>You are signed in!!!</p>
    }
};


export default App;
