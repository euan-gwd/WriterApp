import React from 'react';
import Rebase from 're-base';
import Container from './components/Container';
import NewChat from './components/NewChat';

const base = Rebase.createClass({
  apiKey: "AIzaSyDYliJuBFjLAQO_vfH0rlioWUiKrRe_ZL4",
  authDomain: "tchatapp-586ab.baseapp.com",
  databaseURL: "https://tchatapp-586ab.baseio.com",
  storageBucket: "tchatapp-586ab.appspot.com",
  messagingSenderId: "846810590536"
});

class Chat extends React.Component {
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
    base.bindToState('chats', {
      context: this,
      state: 'messages',
      asArray: true
    })
  };

  render() {
    return (
      <div className="container is-fluid">
      <br />
        <NewChat chats={this.state.messages} />
        <Container />
      </div>
    );
  }
};

export default Chat;