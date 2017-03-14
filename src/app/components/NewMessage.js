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
			file: '',
			imagePreviewUrl: ''
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
		let file = this.state.file;
		let userID = this.props.userEmail;
		let storageRef = base.storage().ref('/images/'+ userID + '/' + file.name);
		storageRef.put(file);
		if (this.state.chars_left >= 0) {
			base.post('msgList', {
				data: this.props.msgList.concat([{
					message: ReactDOM.findDOMNode(this.refs.message).value,
					datetime: `${msgTime}`,
					image: this.state.file,
					userName: this.props.userName,
					userEmail: this.props.userEmail
				}]),
				context: this
			});
		}

		ReactDOM.findDOMNode(this.refs.message).value = '';
		this.setState(
			{
				chars_left: max_chars,
				file: '',
				imagePreviewUrl: ''
			});
	}

	handleCharacterCount() {
		let input_chars = this.refs.message.value.length;
		this.setState({
			chars_left: max_chars - input_chars
		});
	}

	handleImgUpload = (e) => {
		e.preventDefault();
		let reader = new FileReader();
		let file = e.target.files[0];
		reader.onloadend = () => {
			this.setState({
				file: file,
				imagePreviewUrl: reader.result
			});
		}
		reader.readAsDataURL(file)
	}

	render() {
		let { imagePreviewUrl } = this.state;
		let $imagePreview = null;
		if (imagePreviewUrl) {
			$imagePreview = (<img src={imagePreviewUrl} className="image is-128x128" alt={this.state.file.name} />);
		}
		return (
			<div className="new-message-box">
				<form onSubmit={this.handleSubmit.bind(this)} className='box'>
					<div className="control">
						{$imagePreview}
						<input ref='message' accept="image/*" placeholder='Say something good...' className='input is-expanded' onChange={this.handleCharacterCount.bind(this)} required />
					</div>
					<div className="level is-mobile">
						<div className="level-left">
							<div className="level-item">
								<input type="file" name="fileUploader" ref="fileUpload" id="fileUpload" className="input-file" onChange={this.handleImgUpload} />
								<label htmlFor="fileUpload" className="button is-light" type="button" >
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
