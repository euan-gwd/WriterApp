import React from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import logo from '../logo.svg';
import "./layout.css";
import './icon-colors.css';

class SignedOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInUser: false,
      signUpUser: false
    }
  } //end constructor

  handleSignInBtnClick() {
    this.setState({signInUser: true})
  } //end handleSignInBtnClick

  onUserSignIn(newState) {
    this.setState({signInUser: newState})
  } //end onUserSignIn

  handleSignUpBtnClick() {
    this.setState({signUpUser: true})
  } //end handleSignUpBtnClick

  onUserSignUp(newState) {
    this.setState({signUpUser: newState})
  } //end onUserSignUp

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
                <span>Log In</span>
              </a>
            </div>
            <div className="nav-item">
              <a id="sign-in" className="button is-info is-outlined is-small" onClick={this.handleSignUpBtnClick.bind(this)}>
                <span className="icon is-small">
                  <i className="fa fa-user-plus"></i>
                </span>
                <span>Sign Up</span>
              </a>
            </div>
          </div>
        </nav>
        <section className="scribe-container">
          <div className="centered">
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
  } //end Render

}

export default SignedOut;
