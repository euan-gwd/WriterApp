import React from 'react';
import firebaseui from 'firebaseui';
import Rebase from 're-base';
import MessageList from './components/MessageList';
import logo from './logo.svg';
import noUserPhoto from './assets/128x128.png';
import './App.css';

const base = Rebase.createClass({
  apiKey: "AIzaSyA7rSLgtDXwdc_nj4fmwYuTilQN19a4ytY",
  authDomain: "react-chat-app-f64bb.firebaseapp.com",
  databaseURL: "https://react-chat-app-f64bb.firebaseio.com",
  storageBucket: "react-chat-app-f64bb.appspot.com",
  messagingSenderId: "962792118288"
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
    base.auth.EmailAuthProvider.PROVIDER_ID,
    base.auth.GoogleAuthProvider.PROVIDER_ID
  ]
};

const ui = new firebaseui.auth.AuthUI(base.auth());
let currentUser = null;

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUserName: null,
      currentUserEmail: null,
      currentUserPhoto: null
    }
  }


  handleSignedInUser = (user) => {
    currentUser = base.auth().currentUser;
    document.getElementById('user-signed-in').style.display = 'block';
    document.getElementById('user-signed-out').style.display = 'none';
    // document.getElementById('name').textContent = user.displayName;
    this.setState({
      currentUserName: user.displayName,
      currentUserEmail: user.email,
      currentUserPhoto: user.photoURL
    });
  }

  handleSignedOutUser = () => {
    base.unauth();
    document.getElementById('user-signed-in').style.display = 'none';
    document.getElementById('user-signed-out').style.display = 'block';
    ui.start('#firebaseui-auth-container', uiConfig);
    this.setState({
      currentUserName: null,
      currentUserEmail: null,
      currentUserPhoto: null
    });
    currentUser = null;
  }

  initApp() {
    base.auth().onAuthStateChanged((user) => {
      if (user === currentUser) {
        this.setState({
          currentUserName: user.displayName,
          currentUserEmail: user.email,
          currentUserPhoto: user.photoURL
        });
        return;
      }
      user ? this.handleSignedInUser(user) : this.handleSignedOutUser();
    });
  }

  componentDidMount() {
    this.initApp();
  }

  render() {
    return (
      <div>
        <div id="user-signed-in">
          <nav className="nav">
            <div className="nav-left">
              <div className="nav-item">
                <h1 className="title">Scriber</h1>
              </div>
            </div>
            <div className="nav-center">
              <div className="nav-item">
                <img src={logo} alt="logo" className="App-logo" />
              </div>
            </div>
            <div className="nav-right">
              <div className="nav-item">
                {this.state.hasOwnProperty("currentUserPhoto")
                  ? <figure className="image is-24x24">
                    <img src={this.state.currentUserPhoto} alt="profilePic" />
                  </figure>
                  : <figure className="image is-24x24">
                    <img src={noUserPhoto} alt="noprofilePic" />
                  </figure>
                }
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
          <MessageList userName={this.state.currentUserName} userEmail={this.state.currentUserEmail} userPhoto={this.state.currentUserPhoto} />
        </div>
        <div id="user-signed-out">
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