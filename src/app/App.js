import React from 'react';
import firebaseui from 'firebaseui';
// import base from './rebase.config';
import base from './firebase.config';
import ScribeList from './components/ScribeList';
import logo from './logo.svg';
import './App.css';

const uiConfig = {
  callbacks: {
    'signInSuccess': function (user) {
      this.handleSignIn(user);
      return false;
    }
  },
  credentialHelper: firebaseui.auth.CredentialHelper.NONE,
  signInOptions: [base.auth.EmailAuthProvider.PROVIDER_ID, base.auth.GoogleAuthProvider.PROVIDER_ID]
};

const ui = new firebaseui.auth.AuthUI(base.auth());

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUserName: null,
      currentUserId: null,
      currentUserEmail: null,
      currentUserPhoto: null
    }
  }

  handleSignedInUser = (user) => {
    this.setState({
      currentUserName: user.displayName,
      currentUserId: user.uid,
      currentUserEmail: user.email,
      currentUserPhoto: user.photoURL,
      userSignedIn: 'show',
      userSignedOut: 'hide',
      profilePic: 'show'
    });
  }

  handleSignedOutUser = () => {
    this.setState({
      currentUserName: null,
      currentUserId: null,
      currentUserEmail: null,
      currentUserPhoto: null,
      userSignedIn: 'hide',
      userSignedOut: 'show',
      profilePic: 'hide'
    });
    base.auth().signOut();
    ui.start('#firebaseui-auth-container', uiConfig);
  }

  componentDidMount() {
    base.auth().onAuthStateChanged((user) => {
      if (user) {
        this.handleSignedInUser(user)
      } else {
        this.handleSignedOutUser();
      }
    });
  }

  render() {
    return (
      <div>
        <div id="user-signed-in" ref="userSignedIn" className={`user-signed-in ${this.state.userSignedIn}`}>
          <nav className="nav has-shadow">
            <div className="grid-container">
              <a className="nav-item is-tab is-active">
                <span className="icon">
                  <i className="fa fa-home fa-fw"></i>
                </span>
                <span className="is-hidden-mobile">&nbsp;Home</span>
              </a>
              <a className="nav-item is-tab">
                <span className="icon">
                  <i className="fa fa-comments-o fa-fw"></i>
                </span>
                <span className="is-hidden-mobile">&nbsp;Messages</span>
              </a>
              <div className="nav-item">
                <img src={logo} alt="logo" className="App-logo" />
                <h1 className="title is-hidden-mobile">Scriber</h1>
              </div>
              <div className="nav-item">
                <div className={`nav-spacing this.state.profilePic`}>
                  {(this.state.currentUserPhoto)
                    ? <figure className="image is-24x24"><img src={this.state.currentUserPhoto} alt="profilePic" className="nav-image-is-rounded" /></figure>
                    : <i className="fa fa-user-circle-o fa-2x" aria-hidden="true"></i>}
                </div>
                <a id="sign-out" className="button is-danger is-outlined is-small" onClick={this.handleSignedOutUser}>
                  <span className="icon is-small">
                    <i className="fa fa-sign-out"></i>
                  </span>
                  <span className="is-hidden-mobile">Sign Out</span>
                </a>
              </div>
            </div>
          </nav>
          <ScribeList userName={this.state.currentUserName} userId={this.state.currentUserId} userEmail={this.state.currentUserEmail} userPhoto={this.state.currentUserPhoto} />
        </div>
        <div id="user-signed-out" ref="userSignedOut" className={`user-signed-out ${this.state.userSignedOut}`}>
          <nav className="nav has-shadow">
            <div className="container">
              <div className="nav-left">
                <div className="nav-item">
                  <img src={logo} alt="logo" />
                </div>
              </div>
              <div className="nav-right">
                <h4 className="nav-item">Please Sign In.</h4>
              </div>
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
