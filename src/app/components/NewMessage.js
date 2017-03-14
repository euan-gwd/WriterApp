import React from 'react';
import ReactDOM from 'react-dom';
import Rebase from 're-base';

const base = Rebase.createClass({
	apiKey: "AIzaSyA7rSLgtDXwdc_nj4fmwYuTilQN19a4ytY",
	authDomain: "react-chat-app-f64bb.firebaseapp.com",
	databaseURL: "https://react-chat-app-f64bb.firebaseio.com",
	storageBucket: "react-chat-app-f64bb.appspot.com",
	messagingSenderId: "962792118288"
});

const max_chars = 160;


class NewMessage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			chars_left: max_chars,
			date: new Date().toLocaleString(),
			photoAdded: false
		};
	}

	componentDidMount() {
		this.timerID = setInterval(
			() => this.tick(),
			1000
		);
	}

	componentWillUnmount() {
		clearInterval(this.timerID);
	}

	tick() {
		this.setState({
			date: new Date().toLocaleString()
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		let msgTime = this.state.date;
		if (this.state.chars_left >= 0) {
			base.post('msgList', {
				data: this.props.msgList.concat([{
					message: ReactDOM.findDOMNode(this.refs.message).value,
					datetime: `${msgTime}`,
					userName: this.props.userName,
					userEmail: this.props.userEmail
				}]),
				context: this
			});
		}

		ReactDOM.findDOMNode(this.refs.message).value = '';
		this.setState({ chars_left: max_chars });
	}

	handleCharacterCount() {
		let input_chars = this.refs.message.value.length;
		this.setState({
			chars_left: max_chars - input_chars
		});
	}

	handlePhotoUpload(e) {
		this.setState({ photoAdded: !this.state.photoAdded });
		// let uploadPic = this.refs.file.getDOMNode().files[0];

	}

	render() {
		return (
			<div className="new-message-box">
				<form onSubmit={this.handleSubmit.bind(this)} className='box'>
					<div className="control">
						<input ref='message' placeholder='Say something good...' className='input is-expanded' onChange={this.handleCharacterCount.bind(this)} required />
					</div>
					<div className="level is-mobile">
						<div className="level-left">
							<div className="level-item has-text-centered">
								<input type="file" accept="image/*" name="file" id="file" className="input-file" />
								<label htmlFor="file" className="button is-light" type="button" onClick={this.handlePhotoUpload.bind(this)} >
									<i className="fa fa-camera" aria-hidden="true" />
								</label>
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
