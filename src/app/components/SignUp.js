import React from 'react';
import './scribes.css';

class SignUp extends React.Component {
		handleSubmit(){

		}

  render() {
    return (
      <div className="login-container">
        <div className="card">
          <header className="card-header">
            <p className="card-header-title">Join Us</p>
          </header>
          <form className="card-content">
            <div className="field">
              <p className="control has-icon">
                <input className="input" type="text" placeholder="Full Name"/>
                <span className="icon is-small">
                  <i className="fa fa-address-card"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icon">
                <input className="input" type="email" placeholder="Email"/>
                <span className="icon is-small">
                  <i className="fa fa-envelope"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icon">
                <input className="input" type="password" placeholder="Password"/>
                <span className="icon is-small">
                  <i className="fa fa-lock"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control">
                <button type="submit" className="button is-success is-outlined">Sign Up</button>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }

}

export default SignUp;
