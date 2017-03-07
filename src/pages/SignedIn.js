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

class SignedIn extends React.Component {
  initApp = function () {
    base.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var photoURL = user.photoURL;
        var uid = user.uid;
        user.getToken().then(function (accessToken) {
          document.getElementById('sign-in-status').textContent = 'Signed in';
          document.getElementById('sign-in').textContent = 'Sign out';
          document.getElementById('account-details').textContent = JSON.stringify({
            displayName: displayName,
            email: email,
            uid: uid
          }, null, '  ');
        });
      } else {
        // User is signed out.
        document.getElementById('sign-in-status').textContent = 'Signed out';
        document.getElementById('sign-in').textContent = 'Sign in';
        document.getElementById('account-details').textContent = 'null';
      }
    }, function (error) {
      console.log(error);
    });
  };

  componentDidMount() {
    this.initApp();
  }


  render() {
    return (
      <div>
        <div id="sign-in-status"></div>
        <button id="sign-in" className="btn btn-outline-success"></button>
        <div id="account-details"></div>
      </div>
    );
  }
}

export default SignedIn;