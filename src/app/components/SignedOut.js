import React from 'react';
// import * as firebase from 'firebase';
import '../App.css';

class SignedOut extends React.Component {

  render() {
    return (
      <div>
        <section className="hero is-light is-large is-bold">
          <div className="hero-body">
            <div class="container">
              <h1 className="title has-text-centered">
                What's a happening...?
              </h1>
              <h2 className="subtitle has-text-centered">
                Join the conversation...
              </h2>
            </div>
          </div>
        </section>
      </div>
    );
  }

}

export default SignedOut;
