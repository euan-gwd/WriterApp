import React from 'react';
import ReactDOM from 'react-dom';
import firebaseui from 'firebaseui';
import Rebase from 're-base';

const base = Rebase.createClass({
    apiKey: "AIzaSyDYliJuBFjLAQO_vfH0rlioWUiKrRe_ZL4",
    authDomain: "tchatapp-586ab.baseapp.com",
    databaseURL: "https://tchatapp-586ab.baseio.com",
    storageBucket: "tchatapp-586ab.appspot.com",
    messagingSenderId: "846810590536"
});

const uiConfig = {
    callbacks: {
        signInSuccess: function (currentUser, credential, redirectUrl) {
            
            // Do something.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            return true;
        },
        uiShown: function () {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById('loader').style.display = 'none';
            // ReactDOM.findDOMNode(this.ref.loader).style.display = 'none';
        }
    },
    credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM,
    // Query parameter name for mode.
    queryParameterForWidgetMode: 'mode',
    // Query parameter name for sign in success url.
    queryParameterForSignInSuccessUrl: 'signInSuccessUrl',
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: "/chat",
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        base.auth.EmailAuthProvider.PROVIDER_ID
    ]
};


class Login extends React.Component {
    componentDidMount() {
        const ui = new firebaseui.auth.AuthUI(base.auth());
        ui.start('#firebaseui-auth-container', uiConfig);
    }

    render() {
        return (
            <div>
                <h1>Welcome to My Awesome App</h1>
                <div id="firebaseui-auth-container"></div>
                <div id="loader">Loading...</div>
            </div>
        );
    }
}

export default Login;