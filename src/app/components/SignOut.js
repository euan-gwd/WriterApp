import React from 'react';
import logo from './logo.svg';
import './App.css';

class SignOut extends React.Component {

  render() {
    return (
      <div id="user-signed-out" ref="userSignedOut" className={`user-signed-out ${this.state.userSignedOut}`}>
        <nav className="nav has-shadow">
          <div className="container">
            <div className="nav-left">
              <div className="nav-item">
                <img src={logo} alt="logo"/>
              </div>
            </div>
            <div className="nav-right">
              <h4 className="nav-item">Please Sign In.</h4>
            </div>
          </div>
        </nav>
        <br/>
        <div id="firebaseui-spa">
          <div id="firebaseui-auth-container"></div>
        </div>
      </div>
    );
  }

}

export default SignOut;
