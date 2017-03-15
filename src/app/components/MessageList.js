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
			messages: [],
			loading: true
		};
	};

	componentDidMount() {
		this.ref = base.syncState('msgList', {
			context: this,
			state: 'messages',
			asArray: true,
			then() {
				this.setState({ loading: false })
			}
		})
	};

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	deleteMessage(index, e) {
		e.stopPropagation();
		let arr = this.state.messages.concat([]);
		let messageUID = arr[index].userName;
		let imgRef = arr[index].messageImage;
		let deleteImgRef = base.storage().refFromURL(imgRef);
		let currentUID = this.props.userName;
		if (messageUID === currentUID) {
			arr.splice(index, 1);
			this.setState({
				messages: arr
			})
			deleteImgRef.delete();
		}
	}

	render() {
		let messages = this.state.messages.map((item, index) => {
			return (
				<Message thread={item} removeMessage={this.deleteMessage.bind(this, index)} key={index} className="panel-block" />
			);
		})

		return (
			<div className="container">
				{this.state.loading === true
					? <div className="centered">
						<span className="icon">
							<i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
							<span className="sr-only">Loading...</span>
						</span>
					</div>
					: <div class="panel">
						<NewMessage msgList={this.state.messages} userName={this.props.userName} userEmail={this.props.userEmail} className="panel-block" />
						<ul>{messages}</ul>
					</div>}
			</div>
		);
	}
}

export default MessageList;
