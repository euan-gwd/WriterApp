import React from 'react';
import Rebase from 're-base';
import NewMessage from './NewMessage';
import Message from './Message';

const base = Rebase.createClass({
	apiKey: "AIzaSyDYliJuBFjLAQO_vfH0rlioWUiKrRe_ZL4",
	authDomain: "tchatapp-586ab.firebaseapp.com",
	databaseURL: "https://tchatapp-586ab.firebaseio.com",
	storageBucket: "tchatapp-586ab.appspot.com",
	messagingSenderId: "846810590536"
});

class MessageList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			messages: []
		};
	};

	componentWillMount() {
		this.ref = base.syncState('msgList', {
			context: this,
			state: 'messages',
			asArray: true
		})
	};

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	_removeMessage(index, e) {
		e.stopPropagation();
		let arr = this.state.messages.concat([]);
		arr.splice(index, 1);

		this.setState({
			messages: arr
		})
	}

	render() {
		let messages = this.state.messages.map((item, index) => {
			return (
				<Message thread={item} removeMessage={this._removeMessage.bind(this, index)} key={index} />
			);
		})

		return (
			<div className="container">
				<br />
				<NewMessage msgList={this.state.messages} userName={this.props.userName} userEmail={this.props.userEmail} />
				<br />
				<ul>{messages}</ul>
			</div>
		);
	}
}

export default MessageList;
