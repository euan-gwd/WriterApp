import React from 'react';
import ScribeList from './components/ScribeList';
import logo from './logo.svg';
import './App.css';

class SignIn extends React.Component {

  render() {
    return (
      <div id="user-signed-in" ref="userSignedIn" className={`user-signed-in ${this.state.userSignedIn}`}>
        <nav className="nav has-shadow">
          <div className="grid-container">
            <a className="nav-item is-tab is-active">
              <span className="icon">
                <i className="fa fa-home fa-fw"></i>
              </span>
              <span className="is-hidden-mobile">&nbsp;Home</span>
            </a>
            <a className="nav-item is-tab">
              <span className="icon">
                <i className="fa fa-comments-o fa-fw"></i>
              </span>
              <span className="is-hidden-mobile">&nbsp;Messages</span>
            </a>
            <div className="nav-item">
              <img src={logo} alt="logo" className="App-logo"/>
              <h1 className="title is-hidden-mobile">Village Scriber</h1>
            </div>
            <div className="nav-item">
              <div className={`nav-spacing this.state.profilePic`}>
                {(this.state.currentUserPhoto)
                  ? <figure className="image is-24x24"><img src={this.state.currentUserPhoto} alt="profilePic" className="nav-image-is-rounded"/></figure>
                  : <i className="fa fa-user-circle-o fa-2x" aria-hidden="true"></i>}
              </div>
              <a id="sign-out" className="button is-danger is-outlined is-small" onClick={this.handleSignedOutUser}>
                <span className="icon is-small">
                  <i className="fa fa-sign-out"></i>
                </span>
                <span className="is-hidden-mobile">Sign Out</span>
              </a>
            </div>
          </div>
        </nav>
        <ScribeList userName={this.state.currentUserName} userId={this.state.currentUserId} userEmail={this.state.currentUserEmail} userPhoto={this.state.currentUserPhoto}/>
      </div>
    );
  }

}

export default SignIn;
