import React from 'react';
import ReactDOM from 'react-dom';
import Rebase from 're-base';
import './messages.css';

const base = Rebase.createClass({
	apiKey: "AIzaSyDYliJuBFjLAQO_vfH0rlioWUiKrRe_ZL4",
	authDomain: "tchatapp-586ab.firebaseapp.com",
	databaseURL: "https://tchatapp-586ab.firebaseio.com",
	storageBucket: "tchatapp-586ab.appspot.com",
	messagingSenderId: "846810590536"
});

const max_chars = 160;

class NewMessage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			chars_left: max_chars
		};
	}

	handleSubmit(e) {
		e.preventDefault();
		base.post('msgList', {
			data: this.props.msgList.concat([{
				message: ReactDOM.findDOMNode(this.refs.message).value,
				userName: this.props.userName,
				userEmail: this.props.userEmail
			}]),
			context: this
		});

		ReactDOM.findDOMNode(this.refs.message).value = '';
		this.setState({ chars_left: max_chars });
	}

	handleCharacterCount() {
		let input_chars = this.refs.message.value.length;
		this.setState({
			chars_left: max_chars - input_chars
		});
	}

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit.bind(this)} className='box'>
					<div className="control">
						<input ref='message' placeholder='What is happening?' className='input is-expanded' onChange={this.handleCharacterCount.bind(this)} />
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
								<small className="">{this.state.chars_left} characters</small>
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

export default NewMessage;
