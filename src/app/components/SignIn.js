import React from 'react';
import * as firebase from 'firebase';
import "./layout.css";
import './icon-colors.css';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInUser: this.props.initialState,
      emailText: '',
      passText: '',
      emailErr: 'invisible',
      passErr: 'invisible'
    };
  } //end constructor

  handleUserSignIn = (evt) => {
    evt.preventDefault();
    let email = this.state.emailText.toString();
    let pass = this.state.passText.toString();
    let emailValid = false;
    let passValid = false;
    if (email.length < 4) {
      this.setState({emailErr: 'visible'});
      emailValid = false;
    } else if (email.length === '') {
      this.setState({emailErr: 'invisible'});
      emailValid = false;
    } else {
      this.setState({emailErr: 'invisible'});
      emailValid = true;
    }
    if (pass.length < 4) {
      this.setState({passErr: 'visible'});
      passValid = false;
    } else if (pass.length === '') {
      this.setState({passErr: 'invisible'});
      passValid = false;
    } else {
      this.setState({passErr: 'invisible'});
      passValid = true;
    }
    if (emailValid && passValid) {
      firebase.auth().signInWithEmailAndPassword(email, pass).catch(err => {
        console.log(err);
      });
    }
  } //end handleUserSignIn

  handleSignInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  } //end handleSignInWithGoogle

  handleForgottenPassword = (evt) => {
    evt.preventDefault();
    let email = this.state.emailText.toString();
    let emailValid = false;
    if (email.length < 4) {
      this.setState({emailErr: 'visible'});
      emailValid = false;
    } else if (email.length === '') {
      this.setState({emailErr: 'invisible'});
      emailValid = false;
    } else {
      this.setState({emailErr: 'invisible'});
      emailValid = true;
    }
    if (emailValid === true) {
      firebase.auth().sendPasswordResetEmail(email);
    }
  } //end handleForgottenPassword

  handleCancel = (evt) => {
    const newState = !this.state.signInUser;
    this.props.callbackParent(newState);
  } //end handleCancel

  handleEmailInput = (evt) => {
    this.setState({emailText: evt.target.value});
  } //end handleEmailInput

  handlePassInput = (evt) => {
    this.setState({passText: evt.target.value});
  } //end handlePassInput

  componentWillUnmount() {
    this.setState({emailText: '', passText: ''});
  } //end componentWillUnmount

  render() {
    return (
      <div className="modal-background">
        <div className="login-container is-overlay">
          <div className="signIn-card">
            <header className="modal-card-head">
              <h3 className="modal-card-title has-text-centered">Sign In</h3>
            </header>
            <div className="modal-card-body">
              <span>Enter your e-mail and password below to sign in, if you have forgotten your password<br/>
                Only fill in your e-mail and click on forgot password to send an email to reset it.</span>
            </div>
            <form className="modal-card-body" onSubmit={this.handleUserSignIn.bind(this)}>
              {(this.state.emailErr === 'visible')
                ? <div className="field">
                    <p className="control has-icon has-icon-right">
                      <input className="input is-danger" defaultValue={this.state.emailText} type="email" placeholder="Email" onChange={this.handleEmailInput.bind(this)}/>
                      <span className="icon is-small">
                        <i className="fa fa-warning"></i>
                      </span>
                    </p>
                    <span className="help is-danger">Please enter a valid email address.</span>
                    <a className="help" onClick={this.handleForgottenPassword.bind(this)}>Forgot Password</a>
                  </div>
                : <div className="field">
                  <p className="control has-icon">
                    <input className="input" defaultValue={this.state.emailText} type="email" placeholder="Email" onChange={this.handleEmailInput.bind(this)} required/>
                    <span className="icon is-small">
                      <i className="fa fa-envelope"></i>
                    </span>
                  </p>
                  <a className="help" onClick={this.handleForgottenPassword.bind(this)}>Forgot Password</a>
                </div>}
              {(this.state.passErr === 'visible')
                ? <div className="field">
                    <p className="control has-icon has-icon-right">
                      <input className="input is-danger" defaultValue={this.state.passText} type="password" placeholder="Password" onChange={this.handlePassInput.bind(this)}/>
                      <span className="icon is-small">
                        <i className="fa fa-warning"></i>
                      </span>
                    </p>
                    <span className="help is-danger">Please enter a valid password.</span>
                  </div>
                : <div className="field">
                  <p className="control has-icon">
                    <input className="input" defaultValue={this.state.passText} type="password" placeholder="Password" onChange={this.handlePassInput.bind(this)}/>
                    <span className="icon is-small">
                      <i className="fa fa-lock"></i>
                    </span>
                  </p>
                </div>}
              <div className="field is-group">
                <p className="control">
                  <button type="submit" className="button is-success is-outlined">Sign In</button>
                </p>
                <p className="control">
                  <button onClick={this.handleCancel} className="button is-light is-outlined">Cancel</button>
                </p>
              </div>
            </form>
            <footer className="modal-card-foot">
              <a className="button is-info is-outlined" onClick={this.handleSignInWithGoogle}>
                <span className="icon is-small">
                  <i className="fa fa-google-plus"></i>
                </span>
                <span>Sign In with Google</span>
              </a>
            </footer>
          </div>
        </div>
      </div>
    );
  } //end render

}

export default SignIn;
