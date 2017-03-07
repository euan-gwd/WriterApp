import React from 'react';
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
  signInSuccessUrl: '/SignedIn',
  credentialHelper: firebaseui.auth.CredentialHelper.NONE,
  signInOptions: [
    base.auth.EmailAuthProvider.PROVIDER_ID
  ]
};

const ui = new firebaseui.auth.AuthUI(base.auth());

class Login extends React.Component {

  handleSignIn = (evt) => {
    evt.preventDefault();
    ui.start('#firebaseui-auth-container', uiConfig);
  }

  render() {
    return (
      <div className="container">
        <nav className="navbar navbar-light bg-faded">
          <ul className="nav justify-content-end">
            <li className="nav-item">
              <button className="btn btn-outline-success" onClick={this.handleSignIn} >Sign In</button>
            </li>
          </ul>
        </nav>
        <br />
        <div id="firebaseui-auth-container"></div>
      </div>
    );
  }
}

export default Login;