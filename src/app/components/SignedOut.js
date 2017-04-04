import React from 'react';
import * as firebase from 'firebase';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import logo from '../logo.svg';
import './scribes.css';

class SignedOut extends React.Component {

  handleSignedInUser = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  handleUserSignUp = () => {}

  render() {
    return (
      <Router>
        <div className="">
          <nav className="nav has-shadow">
            <div className="nav-center">
              <div className="nav-item">
                <img src={logo} alt="logo" className="App-logo"/>
                <h1 className="title is-hidden-mobile">Village Scriber</h1>
              </div>
														<div className="nav-item"></div>
              <div className="nav-item">
                <Link to="/SignIn" id="sign-in" className="button is-success is-outlined is-small">
                  <span className="icon is-small">
                    <i className="fa fa-sign-in"></i>
                  </span>
                  <span className="is-hidden-mobile">Log In</span>
                </Link>
              </div>
              <div className="nav-item">
                <Link to="/SignUp" id="sign-in" className="button is-info is-outlined is-small">
                  <span className="icon is-small">
                    <i className="fa fa-user-plus"></i>
                  </span>
                  <span className="is-hidden-mobile">Sign Up</span>
                </Link>
              </div>
            </div>
          </nav>
          <section className="hero is-light is-small is-bold">
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
          <Route path="/SignIn" component={SignIn} className="backing"/>
          <Route path="/SignUp" component={SignUp} className="backing"/>
        </div>
      </Router>
    );
  }

}

export default SignedOut;
