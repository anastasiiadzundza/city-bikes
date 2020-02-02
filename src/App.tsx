import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';


interface StateI {
    isSignedIn: boolean,
    err: any
};




class App extends React.Component<{}, StateI> {

    state = {
        isSignedIn: false,
        err: null
    };
    
    auth2: any;
    
    componentDidMount() {
        const successCallback = this.onSuccess;

        window.gapi.load('auth2', () => {
            this.auth2 = gapi.auth2.init({
                client_id: '193416603177-ms4sapq9ns3fvu417m9p4i8fco7ed8ci.apps.googleusercontent.com',
            });
            this.auth2.then(() => {
                console.log('on init');
                this.setState({
                    isSignedIn: this.auth2.isSignedIn.get(),
                });
            });
        });

        


        window.gapi.load('signin2', function() {
            // Method 3: render a sign in button
            // using this method will show Signed In if the user is already signed in
            var opts = {
                width: 200,
                height: 50,
                client_id: '193416603177-ms4sapq9ns3fvu417m9p4i8fco7ed8ci.apps.googleusercontent.com',
                onsuccess: successCallback
            };
            gapi.signin2.render('loginButton', opts)
        });

    }

    onSuccess = () => {
        console.log('on success');
        this.setState({
            isSignedIn: true,
            err: null
        });
    };


    getContent = () => {
        console.log('here');
        if (this.state.isSignedIn) {
            return <p>hello user, you're signed in </p>
        } else {
            return (
                <div>
                    <p>You are not signed in. Click here to sign in.</p>
                    <button id="loginButton">Login with Google</button>
                </div>
            )
        }

    };

    render(): JSX.Element {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <p>
                        Edit <code>src/App.tsx</code> and save to reload.
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                    {this.getContent()}
                </header>
            </div>
        );
    }
};

export default App;
