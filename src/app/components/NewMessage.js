import React from 'react';
import ReactDOM from 'react-dom';
import Rebase from 're-base';
import "./messages.css";

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
			imagePreviewUrl: '',
			imageUrl: ''
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
		let file = this.state.file;
		let userId = this.props.userEmail;
		let messageText = ReactDOM.findDOMNode(this.refs.message).value;
		let datetime = this.state.date;
		let userName = this.props.userName;
		let userEmail = this.props.userEmail;

		if (file !== '' && this.state.chars_left >= 0) {
			let storageRef = base.storage().ref('/images/' + userId + '/' + file.name);
			let uploadTask = storageRef.put(file);
			uploadTask.on('state_changed', function (snapshot) {
				let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				console.log('Upload is ' + progress + '% done');
				document.getElementById('uploadBar').style.display = 'block';
				document.getElementById('uploadBar').value = progress;
			}, function (error) {
				// Handle unsuccessful uploads
			}, function () {
				// Handle successful uploads on complete
				let postKey = base.database().ref('msgList/').push().key;
				let downloadURL = uploadTask.snapshot.downloadURL;
				let updates = {};
				let postData = {
					message: messageText,
					messageImage: downloadURL,
					datetime: datetime,
					userName: userName,
					userEmail: userEmail
				}
				updates['/msgList/' + postKey] = postData;
				base.database().ref().update(updates);
			});
		} else {
			if (this.state.chars_left >= 0) {
				let postKey = base.database().ref('msgList/').push().key;
				let updates = {};
				let postData = {
					message: messageText,
					datetime: datetime,
					userName: userName,
					userEmail: userEmail
				}
				updates['/msgList/' + postKey] = postData;
				base.database().ref().update(updates);
			}
		}

		ReactDOM.findDOMNode(this.refs.message).value = '';
		this.setState(
			{
				chars_left: max_chars,
				file: '',
				imagePreviewUrl: ''
			});
		document.getElementById('uploadBar').style.display = 'none';
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

	// removeImgUpload() {
	// 	this.setState({
	// 		file: '',
	// 		imagePreviewUrl: ''
	// 	});
	// }

	render() {
		let $imagePreview = null;
		let { imagePreviewUrl } = this.state;
		if (imagePreviewUrl) {
			$imagePreview = (<span><img src={imagePreviewUrl} className="image is-128x128" alt={this.state.file.name} /></span>);
		} else {
			$imagePreview = null;
		}
		return (
			<div className="new-message-box">
				<form onSubmit={this.handleSubmit.bind(this)} className='box'>
					<div className="control">
						{$imagePreview}
						<input ref='message' accept="image/*" placeholder='Say something good...' className='input is-expanded' onChange={this.handleCharacterCount.bind(this)} required />
						<progress className="progress is-info" max="100" id="uploadBar"></progress>
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
