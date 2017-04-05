import React from 'react';
// import * as firebase from 'firebase';
import './scribes.css';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signUpUser: this.props.initialState,
      emailText: '',
      passText: '',
      fullNameText: '',
      emailErr: 'invisible',
      passErr: 'invisible'
    };
  }

  handleUserSignUp = (evt) => {
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
      this.setState({passErr: 'invisible'});
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
      // firebase.auth().signInWithEmailAndPassword(email, pass).catch(err => {
      //   console.log(err);
      // });
    }

  }

  handleCancel = (evt) => {
    const newState = !this.state.signUpUser;
    this.props.callbackParent(newState);
  }

  handleEmailInput = (evt) => {
    this.setState({emailText: evt.target.value});
  }

  handleFullNameInput = (evt) => {
    this.setState({userNameText: evt.target.value});
  }

  handleUserNameInput = (evt) => {
    this.setState({userNameText: evt.target.value});
  }

  handlePassInput = (evt) => {
    this.setState({passText: evt.target.value});
  }

  componentWillUnmount() {
    this.setState({emailText: '', passText: ''});
  }

  render() {
    return (
      <div className="modal-background">
        <div className="login-container is-overlay">
          <div className="signIn-card">
            <form className="modal-card-body" onSubmit={this.handleUserSignUp.bind(this)}>
              <div className="field">
                <p className="control has-icon">
                  <input className="input" defaultValue={this.state.fullNameText} type="text" placeholder="Full Name" onChange={this.handleFullNameInput.bind(this)}/>
                  <span className="icon is-small">
                    <i className="fa fa-address-card-o"></i>
                  </span>
                </p>
              </div>
              <div className="field has-addons">
                <p className="control has-icon">
                  <input className="input" defaultValue={this.state.userNameText} type="text" placeholder="User Name" onChange={this.handleUserNameInput.bind(this)}/>
                  <span className="icon is-small">
                    <i className="fa fa-at"></i>
                  </span>
                </p>
              </div>
              {(this.state.emailErr === 'visible')
                ? <div className="field">
                    <p className="control has-icon has-icon-right">
                      <input className="input is-danger" defaultValue={this.state.emailText} type="email" placeholder="Email" onChange={this.handleEmailInput.bind(this)}/>
                      <span className="icon is-small">
                        <i className="fa fa-warning"></i>
                      </span>
                    </p>
                    <span className="help is-danger">Please enter a valid email address.</span>
                  </div>
                : <div className="field">
                  <p className="control has-icon">
                    <input className="input" defaultValue={this.state.emailText} type="email" placeholder="Email" onChange={this.handleEmailInput.bind(this)}/>
                    <span className="icon is-small">
                      <i className="fa fa-envelope"></i>
                    </span>
                  </p>
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
                  <button type="submit" className="button is-success is-outlined">Sign Up</button>
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

export default SignUp;
