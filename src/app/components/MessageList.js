import React from 'react';
import Rebase from 're-base';
import NewMessage from './NewMessage';
import Message from './Message';

const base = Rebase.createClass({
	apiKey: "AIzaSyA7rSLgtDXwdc_nj4fmwYuTilQN19a4ytY",
	authDomain: "react-chat-app-f64bb.firebaseapp.com",
	databaseURL: "https://react-chat-app-f64bb.firebaseio.com",
	storageBucket: "react-chat-app-f64bb.appspot.com",
	messagingSenderId: "962792118288"
});

class MessageList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			messages: []
		};
	};

	componentDidMount() {
		this.ref = base.syncState('msgList', {
			context: this,
			state: 'messages',
			asArray: true
		})
	};

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	deleteMessage(index, e) {
		e.stopPropagation();
		let arr = this.state.messages.concat([]);
		let messageUID = arr[0].userName;
		let currentUID = this.props.userName;
		if (messageUID === currentUID) {
			arr.splice(index, 1);
			this.setState({
				messages: arr
			})
		}
	}

	render() {
		let messages = this.state.messages.map((item, index) => {
			return (
				<Message thread={item} removeMessage={this.deleteMessage.bind(this, index)} key={index} />
			);
		})

		return (
			<div className="container">
				<NewMessage msgList={this.state.messages} userName={this.props.userName} userEmail={this.props.userEmail} userID={this.props.userID} className="new-message-box" />
				<ul className="">{messages}</ul>
			</div>
		);
	}
}

export default MessageList;
