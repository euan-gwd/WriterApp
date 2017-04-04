import React from 'react';
import * as firebase from 'firebase';
import logo from '../logo.svg';
import '../App.css';

class SignedOut extends React.Component {

  handleSignedInUser = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  handleUserSignUp = () => {}

  render() {
    return (
      <div>
        <nav className="nav has-shadow">
          <div className="nav-center">
            <div className="nav-item">
              <img src={logo} alt="logo" className="App-logo"/>
              <h1 className="title is-hidden-mobile">Village Scriber</h1>
            </div>
            <div className="nav-item"></div>
            <div className="nav-item">
              <a id="sign-in" className="button is-success is-outlined is-small" onClick={this.handleSignedInUser}>
                <span className="icon is-small">
                  <i className="fa fa-sign-in"></i>
                </span>
                <span className="is-hidden-mobile">Log In</span>
              </a>
            </div>
            <div className="nav-item">
              <a id="sign-in" className="button is-info is-outlined is-small" onClick={this.handleUserSignUp}>
                <span className="icon is-small">
                  <i className="fa fa-user-plus"></i>
                </span>
                <span className="is-hidden-mobile">Sign Up</span>
              </a>
            </div>
          </div>
        </nav>
        <section className="hero is-light is-large is-bold">
          <div className="hero-body">
            <div className="container">
              <h1 className="title has-text-centered">
                What's a happening...?
              </h1>
              <h2 className="subtitle has-text-centered">
                Join the conversation...
              </h2>
            </div>
          </div>
        </section>
      </div>
    );
  }

}

export default SignedOut;
