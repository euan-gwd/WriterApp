import React from 'react';
import ReactDOM from 'react-dom';
import Rebase from 're-base';
import './chat.css';

const base = Rebase.createClass({
	apiKey: "AIzaSyDYliJuBFjLAQO_vfH0rlioWUiKrRe_ZL4",
	authDomain: "tchatapp-586ab.firebaseapp.com",
	databaseURL: "https://tchatapp-586ab.firebaseio.com",
	storageBucket: "tchatapp-586ab.appspot.com",
	messagingSenderId: "846810590536"
});

class NewChat extends React.Component {

	constructor() {
		super();
		this.state = {
			characters: 0
		};
	}

	_newChat(e) {
		e.preventDefault();
		base.post('chats', {
			data: this.props.chats.concat([{
				// title: ReactDOM.findDOMNode(this.refs.title).value,
				message: ReactDOM.findDOMNode(this.refs.message).value
			}]),
			context: this
		});

		ReactDOM.findDOMNode(this.refs.message).value = '';
		// ReactDOM.findDOMNode(this.refs.title).value = '';
		this.setState({ characters: 0 });
	}

	_handleCharacterCount() {
		this.setState({
			characters: this.refs.message.value.length
		});
	}

	render() {
		return (
			<div className='col-8 mx-auto'>
				<form onSubmit={this._newChat.bind(this)} className='media comment-backing bg-faded'>
					<textarea ref='message' placeholder='Message' className='form-control' onChange={this._handleCharacterCount.bind(this)} />
					<div className="d-flex justify-content-start">
						<button className="btn btn-secondary mr-1 mt-1" type="button">
							<i className="fa fa-camera" aria-hidden="true" />
						</button>
					</div>
					<small className="ml-auto text-muted align-self-center mr-1">{this.state.characters} characters</small>
					<button className="btn btn-primary mt-1" type="submit"><i className="fa fa-paper-plane fa-fw" aria-hidden="true" /> Send</button>
				</form>
			</div>
		);
	}

}

export default NewChat;
