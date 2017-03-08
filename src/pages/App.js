import React from 'react';
import firebaseui from 'firebaseui';
import Rebase from 're-base';
import Chat from './Chat';

const base = Rebase.createClass({
  apiKey: "AIzaSyDYliJuBFjLAQO_vfH0rlioWUiKrRe_ZL4",
  authDomain: "tchatapp-586ab.baseapp.com",
  databaseURL: "https://tchatapp-586ab.baseio.com",
  storageBucket: "tchatapp-586ab.appspot.com",
  messagingSenderId: "846810590536"
});

const uiConfig = {
  callbacks: {
    // Called when the user has been successfully signed in.
    'signInSuccess': function (user, credential, redirectUrl) {
      this.handleSignIn(user);
      return false;
    }
  },
  credentialHelper: firebaseui.auth.CredentialHelper.NONE,
  signInOptions: [
    base.auth.EmailAuthProvider.PROVIDER_ID
  ]
};

const ui = new firebaseui.auth.AuthUI(base.auth());
let currentUid = null;

class App extends React.Component {

  handleSignedInUser = (user) => {
    currentUid = user.uid;
    document.getElementById('user-signed-in').style.display = 'block';
    document.getElementById('user-signed-out').style.display = 'none';
    document.getElementById('name').textContent = user.displayName;
  }

  handleSignedOutUser = () => {
    base.auth().signOut();
    document.getElementById('user-signed-in').style.display = 'none';
    document.getElementById('user-signed-out').style.display = 'block';
    ui.start('#firebaseui-auth-container', uiConfig);
  }

  initApp() {
    base.auth().onAuthStateChanged((user) => {
      if (user && user.uid === currentUid) {
        return;
      } else {
        currentUid = null;
      }
      user ? this.handleSignedInUser(user) : this.handleSignedOutUser();
    });
  }

  componentDidMount() {
    this.initApp()
  }

  render() {
    return (
      <div>
        <div id="user-signed-in" className="hidden">
          <nav className="nav bg-faded d-flex justify-content-end">
            <div id="name" className="nav-item mr-3 d-flex align-self-center"></div>
            <button type="button" id="sign-out" className="btn btn-outline-danger my-2 mr-3" onClick={this.handleSignedOutUser} >Sign Out</button>
          </nav>
          <Chat />
        </div>
        <div id="user-signed-out" className="hidden">
          <nav className="nav bg-faded d-flex justify-content-center">
            <h4 className="nav-item mr-3 my-2">You are signed out.</h4>
          </nav>
          <br />
          <div id="firebaseui-spa">
            <div id="firebaseui-auth-container"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;