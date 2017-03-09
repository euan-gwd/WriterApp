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
			<div className=''>
				<form onSubmit={this._newChat.bind(this)} className='box'>
					<div className="control">
						<input ref='message' placeholder='What is happening?' className='input is-expanded' onChange={this._handleCharacterCount.bind(this)} />
					</div>
					<div className="level">
						<div className="level-left">
							<div className="level-item">
								<button className="button is-light" type="button">
									<i className="fa fa-camera" aria-hidden="true" />
								</button>
							</div>
						</div>
						<div className="level-right">
							<div className="level-item">
								<small className="">{this.state.characters} characters</small>
							</div>
							<div className="level-item">
								<button className="button is-info" type="submit">
									<span className="icon">
										<i className="fa fa-paper-plane fa-fw" aria-hidden="true" />
									</span>
									<span>Send</span>
								</button>
							</div>
						</div>
					</div>
				</form>
			</div>
		);
	}

}

export default NewChat;
