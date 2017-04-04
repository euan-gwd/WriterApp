import React from 'react';
// import * as firebase from 'firebase';
import './App.css';

class SignedOut extends React.Component {

  render() {
    return (
      <div>
        <section class="hero is-primary is-large is-bold">
          <div class="hero-body">
            <div class="container">
              <h1 class="title">
                What's a happening...?
              </h1>
              <h2 class="subtitle">
                Join Us
              </h2>
            </div>
          </div>
        </section>
        <div className="grid-container">
          <a id="sign-in" className="button is-success is-outlined">
            <span className="icon">
              <i className="fa fa-sign-in"></i>
            </span>
            <span className="is-hidden-mobile">Log In</span>
          </a>
          <a id="sign-up" className="button is-primary is-outlined">
            <span className="icon">
              <i className="fa fa-user-plus"></i>
            </span>
            <span className="is-hidden-mobile">Sign Up</span>
          </a>
        </div>
      </div>
    );
  }

}

export default SignedOut;
