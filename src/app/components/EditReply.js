import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from "firebase";
import defaultUserPic from '../Default_User_Pic.svg';
import "./layout.css";
import './icon-colors.css';

class EditReply extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			edited: this.props.initialState,
			replyText: this.props.currentReply.scribe,
			date: new Date().toISOString()
		};
	} //end constructor

	componentDidMount() {
		this.timerID = setInterval(() => this.tick(), 1000);
	} //end componentDidMount

	componentWillUnmount() {
		clearInterval(this.timerID);
	} //end componentWillUnmount

	tick() {
		this.setState({date: new Date().toISOString()});
	} //end tick

	handleSubmit(evt) {
		evt.preventDefault();
		let replyText = this.state.replyText;
		let replyKeyRef = this.props.currentReply.key;
		let userId = firebase.auth().currentUser.uid;
		let scribeParentKey = this.props.parentId;
		let chars_left = 160 - this.state.replyText.length;
		if (chars_left >= 0) {
			let scribeData = {
				scribe: replyText
			}
			firebase.database().ref('mainTL/' + scribeParentKey + '/scribeReplies/' + replyKeyRef).update(scribeData);
			firebase.database().ref('/userTL/' + userId + '/' + replyKeyRef).update(scribeData);
		}

		ReactDOM.findDOMNode(this.refs.scribe).value = '';
		const newState = !this.state.edited;
		this.props.callbackParent(newState);
	} //end handleSubmit

	handleInput = (evt) => {
		this.setState({replyText: evt.target.value})
	} //end handleInput

	handleCancel = (evt) => {
		const newState = !this.state.edited;
		this.setState({edited: newState});
		this.props.callbackParent(newState);
	} //end handleCancel

	render() {
		return (
			<form onSubmit={this.handleSubmit.bind(this)}>
				<article className="media flat-box">
					<div className="media-left">
						{(firebase.auth().currentUser.photoURL === null)
							? <figure className="image is-48x48">
									<img src={defaultUserPic} alt="defaultProfilePic" className="image-rounded"/>
								</figure>
							: <figure className="image is-48x48">
								<img src={firebase.auth().currentUser.photoURL} alt="profilePic" className="image-rounded"/>
							</figure>}
					</div>
					<div className="media-content">
						<div>
							<p className="control">
								<textarea ref='scribe' defaultValue={this.state.replyText} className='textarea' onChange={this.handleInput.bind(this)} required/>
								<span className="help is-primary has-text-centered" id="uploadBar" ref="uploadNotif">Updating scribe now...</span>
							</p>
						</div>
						<div className="pt">
							<div className="columns is-mobile is-gapless">
								<div className="column has-text-right char-count">
									<div className="pr">{160 - this.state.replyText.length}</div>
								</div>
								<div className="column is-narrow">
									<button className="button is-primary is-outlined" type="submit" disabled={this.state.replyText.length === 0}>
										<span className="icon is-small">
											<i className="fa fa-pencil-square-o fa-fw" aria-hidden="true"/>
										</span>
										<span>Update</span>
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className="media-right">
						<a onClick={this.handleCancel.bind(this)} className="remove" data-balloon="cancel" data-balloon-pos="up">
							<span className="icon is-small is-small">
								<i className="fa fa-times" aria-hidden="true"></i>
							</span>
						</a>
					</div>
				</article>
			</form>
		);
	} //end render
}

export default EditReply;
