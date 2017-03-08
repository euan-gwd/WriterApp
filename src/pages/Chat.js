import React from 'react';
import Container from './components/Container';
import NewChat from './components/NewChat';
import { base } from './Login';

class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: []
    }
  };

  componentWillUpdate() {
    base.bindToState('chats', {
      context: this,
      state: 'messages',
      asArray: true
    })
  };

  render() {
    return (
      <div>
        <NewChat chats={this.state.messages} />
        <Container />
      </div>
    );
  }
};

export default Chat;