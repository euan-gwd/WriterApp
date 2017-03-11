import React from 'react';
import firebaseui from 'firebaseui';
import Rebase from 're-base';
import MessageList from './components/MessageList';
import logo from './logo.svg';
import './App.css';

const base = Rebase.createClass({
  apiKey: "AIzaSyDYliJuBFjLAQO_vfH0rlioWUiKrRe_ZL4",
  authDomain: "tchatapp-586ab.baseapp.com",
  databaseURL: "https://tchatapp-586ab.baseio.com",
  storageBucket: "tchatapp-586ab.appspot.com",
  messagingSenderId: "846810590536"
});

const uiConfig = {
  callbacks: {
    'signInSuccess': function (user) {
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

  constructor(props) {
    super(props);
    this.state = {
      currentUserName: null,
      currentUserEmail: null
    }
  }


  handleSignedInUser = (user) => {
    currentUid = user.uid;
    document.getElementById('user-signed-in').style.display = 'block';
    document.getElementById('user-signed-out').style.display = 'none';
    document.getElementById('name').textContent = user.displayName;
    this.setState({
      currentUserName: user.displayName,
      currentUserEmail: user.email
    });
  }

  handleSignedOutUser = () => {
    base.auth().signOut();
    document.getElementById('user-signed-in').style.display = 'none';
    document.getElementById('user-signed-out').style.display = 'block';
    ui.start('#firebaseui-auth-container', uiConfig);
    this.setState({
      currentUserName: null,
      currentUserEmail: null
    });
  }

  initApp() {
    base.auth().onAuthStateChanged((user) => {
      if (user && user.uid === currentUid) {
        this.setState({
          currentUserName: user.displayName,
          currentUserEmail: user.email
        });
        return;
      } else {
        currentUid = null;
        this.setState({
          currentUserName: null,
          currentUserEmail: null
        });
      }
      user ? this.handleSignedInUser(user) : this.handleSignedOutUser();
    });
  }

  componentWillMount() {
    this.initApp();
  }

  render() {
    return (
      <div>
        <div id="user-signed-in" className="hidden">
          <nav className="nav">
            <div className="nav-left">
              <div className="nav-item">
                <h1>React Chat App</h1>
              </div>
            </div>
            <div className="nav-center">
              <div className="nav-item">
                <img src={logo} alt="logo" className="App-logo" />
              </div>
            </div>
            <div className="nav-right">
              <div className="nav-item">
                <div id="name"></div>
              </div>
              <div className="nav-item">
                <a id="sign-out" className="button is-danger is-outlined" onClick={this.handleSignedOutUser} >
                  <span className="icon">
                    <i className="fa fa-sign-out"></i>
                  </span>
                  <span>Sign Out</span>
                </a>
              </div>
            </div>
          </nav>
          <MessageList userName={this.state.currentUserName} userEmail={this.state.currentUserEmail} />
        </div>
        <div id="user-signed-out" className="hidden">
          <nav className="nav">
            <div className="nav-left">
              <div className="nav-item">
                <img src={logo} alt="logo" />
              </div>
            </div>
            <div className="nav-right">
              <h4 className="nav-item">You are signed out.</h4>
            </div>
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