export default function googleService () {
    const initGoogleAuth = (setIsLoading) => {
        window.gapi.load('auth2', () => {
            gapi.auth2.init({
                client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
            });
            
            gapi.auth2.getAuthInstance()
                .then((instance) => {
                setIsLoading(false);
            });
        });
    };

    const renderSignInButton = successCallback => {
        const opts = {
            width: 210,
            height: 50,
            longtitle: true,
            client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
            onsuccess: successCallback
        };

        window.gapi.load('signin2',() => {
            gapi.signin2.render('login-button', opts)
        });
    };
    
    const signOut = () => {
        let auth2;
        window.gapi.load('auth2', () => {
            auth2 = gapi.auth2.init({
                client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
            });
        });
        return auth2 ? auth2.signOut() : Promise.reject();
    };
    

    return {
        initGoogleAuth,
        renderSignInButton,
        signOut,
    }
}