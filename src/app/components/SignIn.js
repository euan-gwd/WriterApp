import React from 'react';
import './scribes.css';

class SignIn extends React.Component {

  render() {
    return (
      <div className="backing">
        <div className="login-container">
          <div className="card box">
            <header className="card-header">
              <p className="card-header-title">Sign In</p>
            </header>
            <form className="card-content">
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
                  <button type="submit" className="button is-success is-outlined">Sign In</button>
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
