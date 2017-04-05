import React from 'react';
import * as firebase from 'firebase';
import './scribes.css';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailText: '',
      passText: '',
      emailErr: 'invisible',
      passErr: 'invisible',
      signInUser: this.props.initialState,
    };
  }

  handleUserSignIn = (evt) => {
    evt.preventDefault();
    let email = this.state.emailText;
    let pass = this.state.passText;
    let emailValid = false;
    let passValid = false;
    if (email.length < 4) {
      this.setState({ emailErr: 'visible' });
      emailValid = false;
    } else {
      emailValid = true;
    }
    if (pass.length < 4) {
      this.setState({ passErr: 'visible' });
      passValid = false;
    } else {
      passValid = true;
    }
    if (emailValid && passValid) {
      firebase.auth().signInWithEmailAndPassword(email, pass).catch(err => {
        console.log(err);
      });
    }
  }

  handleCancel = (evt) => {
    const newState = !this.state.signInUser;
    this.props.callbackParent(newState);
  }

  handleEmailInput = (evt) => {
    this.setState({ emailText: evt.target.value });
  }

  handlePassInput = (evt) => {
    this.setState({ passText: evt.target.value });
  }

  componentWillUnmount() {
    this.setState({ emailText: '', passText: '' });
  }

  render() {
    return (
      <div className="modal-background">
        <div className="login-container is-overlay">
          <div className="card box">
            <form className="card-content" onSubmit={this.handleUserSignIn.bind(this)}>
              <div className="field">
                <p className="control has-icon">
                  <input className="input" defaultValue={this.state.emailText} type="email" placeholder="Email" onChange={this.handleEmailInput.bind(this)} />
                  <span className="icon is-small">
                    <i className="fa fa-envelope"></i>
                  </span>
                </p>
                <span className={`help is-danger ${this.state.emailErr}`}>Please enter a valid email address.</span>
              </div>
              <div className="field">
                <p className="control has-icon">
                  <input className="input" defaultValue={this.state.passText} type="password" placeholder="Password" onChange={this.handlePassInput.bind(this)} />
                  <span className="icon is-small">
                    <i className="fa fa-lock"></i>
                  </span>
                </p>
                <span className={`help is-danger ${this.state.passErr}`}>Please enter a valid password.</span>
              </div>
              <div className="field is-group">
                <p className="control">
                  <button type="submit" className="button is-success is-outlined">Sign In</button>
                </p>
                <p className="control">
                  <button onClick={this.handleCancel} className="button is-light is-outlined">Cancel</button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

}

export default SignIn;
