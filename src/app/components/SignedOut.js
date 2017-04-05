import React from 'react';
// import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import logo from '../logo.svg';
import './scribes.css';

class SignedOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInUser: false,
      signUpUser: false
    }
  }

  handleSignInBtnClick() {
    this.setState({signInUser: true})
  }

  onUserSignIn(newState) {
    this.setState({signInUser: newState})
  }

  handleSignUpBtnClick() {
    this.setState({signUpUser: true})
  }

  onUserSignUp(newState) {
    this.setState({signUpUser: newState})
  }

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
              <a id="sign-in" className="button is-success is-outlined is-small" onClick={this.handleSignInBtnClick.bind(this)}>
                <span className="icon is-small">
                  <i className="fa fa-sign-in"></i>
                </span>
                <span className="is-hidden-mobile">Log In</span>
              </a>
            </div>
            <div className="nav-item">
              <a id="sign-in" className="button is-info is-outlined is-small" onClick={this.handleSignUpBtnClick.bind(this)}>
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
        {this.state.signInUser
          ? <SignIn initialState={this.state.signInUser} callbackParent={(newState) => this.onUserSignIn(newState)}/>
          : null}
        {this.state.signUpUser
          ? <SignUp initialState={this.state.signUpUser} callbackParent={(newState) => this.onUserSignUp(newState)}/>
          : null}
      </div>
    );
  }

}

export default SignedOut;
