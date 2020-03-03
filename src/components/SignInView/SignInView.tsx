import React, { FunctionComponent } from 'react';
import SignInButton from '../SignInButton/SignInButton';
import './SignInView.scss';
import { Loader } from 'semantic-ui-react';

interface SignInViewProps {
    isLoading: boolean
}
const SignInView: FunctionComponent<SignInViewProps> = (props) => {
    if (props.isLoading) {
        return (<div className="signin-view">
            <Loader active inline='centered' />
        </div>);
    } else {
        return (
            <div className="signin-view">
                <SignInButton></SignInButton>
            </div>
        )
    }
};


export default SignInView;
