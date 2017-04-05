import React from 'react';
import * as firebase from 'firebase';
import config from './firebase.config';
import ScribeList from './components/ScribeList';
import SignedOut from './components/SignedOut';
import logo from './logo.svg';
import defaultUserPic from './Default_User_Pic.svg';
import './App.css';

firebase.initializeApp(config);

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      auth: false
    }
  }

  handleSignedOutUser = () => {
    firebase.auth().signOut();
  }

  registerUser(user) {
    const userRef = firebase.database().ref('users/' + user.uid);
    userRef.update({name: user.displayName, email: user.email, photoUrl: user.photoURL, lastConnectTime: new Date()});
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({auth: user});
        this.registerUser(user);
      } else {
        this.setState({auth: false});
      }
    });
  }

  render() {
    return (
      <div>
        {(this.state.auth)
          ? <div className="">
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
                    <img src={logo} alt="logo" className="App-logo"/>
                    <h1 className="title is-hidden-mobile">Village Scriber</h1>
                  </div>
                  <div className="nav-item">
                    {(this.state.auth.photoURL === null)
                      ? <img src={defaultUserPic} alt="defaultProfilePic" className="image nav-spacing nav-image-is-rounded"/>
                      : <img src={this.state.auth.photoURL} alt="profilePic" className="image nav-spacing nav-image-is-rounded"/>}
                    <a id="sign-out" className="button is-danger is-outlined is-small" onClick={this.handleSignedOutUser}>
                      <span className="icon is-small">
                        <i className="fa fa-sign-out"></i>
                      </span>
                      <span className="is-hidden-mobile">Log Out</span>
                    </a>
                  </div>
                </div>
              </nav>
              <ScribeList userName={this.state.auth.displayName} userId={this.state.auth.uid} userEmail={this.state.auth.email} userPhoto={this.state.auth.photoURL}/>
            </div>
          : <div className="">
            <SignedOut/>
          </div>}
      </div>
    );
  }
}

export default App;
