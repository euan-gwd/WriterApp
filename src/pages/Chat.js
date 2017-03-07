import React from 'react';
import Rebase from 're-base';
import Container from './components/Container';
import NewChat from './components/NewChat';

const base = Rebase.createClass({
  apiKey: "AIzaSyDYliJuBFjLAQO_vfH0rlioWUiKrRe_ZL4",
  authDomain: "tchatapp-586ab.firebaseapp.com",
  databaseURL: "https://tchatapp-586ab.firebaseio.com",
  storageBucket: "tchatapp-586ab.appspot.com",
  messagingSenderId: "846810590536"
}, 'App');

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: []
    }
  };

  componentWillMount() {
    base.bindToState('chats', {
      context: this,
      state: 'messages',
      asArray: true
    })
  };

  componentDidMount() {
    let currentUid = null;
    base.auth().onAuthStateChanged(function (user) {
      if (user && user.uid !== currentUid) {
        currentUid = user.uid;
        console.log(`Congrats ${user.displayName}, you are done! ${user.email}`);
      } else {
        currentUid = null;
        console.log("no user signed in");
      }
    });
  }

  render() {
    return (
      <div>
        <NewChat chats={this.state.messages} />
        <Container />
      </div>
    );
  }
};

export default App;
