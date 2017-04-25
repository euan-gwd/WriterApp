import React from 'react';
import * as firebase from 'firebase';
import "./layout.css";
import './icon-colors.css';

class Follow extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userId: this.props.UserID,
			userName: null,
			userPhoto: null
		};
	}; //end constructor

	componentDidMount() {
		let userId = this.props.UserID;
		firebase.database().ref('users/' + userId).on('value', (snap) => {
			const followerData = snap.val();
			const {name, photoUrl} = followerData;
			this.setState({userName: name, userPhoto: photoUrl});
		})
		const dbRefList = firebase.database().ref('users/' + userId + '/').child('following');
		dbRefList.on('child_added', (snap) => {
			if (snap.val() === true) {
				this.setState({following: "unfollow"})
			} else if (snap.val() === false) {
				this.setState({following: "follow"})
			}
		})
	} //end componentDidMount

	updateState() {
		if (this.state.following === "follow") {
			this.setState({following: "unfollow"})
		} else if (this.state.following === "unfollow") {
			this.setState({following: "follow"})
		}
	} // end updateState

	onClick = (evt) => {
		this.props.followUser();
		this.updateState();
	} //end onClick

	componentWillUnmount() {
		let userId = this.props.UserID;
		firebase.database().ref('users/' + userId).off();
	} //end componentWillUnmount

	render() {
		let currentUser = firebase.auth().currentUser.uid;
		return (
			<div>
				{(this.state.userId !== currentUser)
					? <div className="selected-scribe mb">
							<div className="media">
								<div className="media-left">
									<figure className="image is-32x32">
										<img src={this.state.userPhoto} alt="profilePic" className="image-rounded"/>
									</figure>
								</div>
								<div className="media-content">
									<p className="subtitle is-6">{this.state.userName}</p>
								</div>
								<div className="media-right">
									<a className={this.state.following} data-balloon={this.state.following} data-balloon-pos="left" onClick={this.onClick.bind(null)}>
										{(this.state.following === "unfollow")
											? <span className="icon is-medium">
													<i className="fa fa-user-times" aria-hidden="true"></i>
												</span>
											: null}
										{(this.state.following === "follow")
											? <span className="icon is-medium">
													<i className="fa fa-user-plus" aria-hidden="true"></i>
												</span>
											: null}
									</a>
								</div>
							</div>
						</div>
					: null}
			</div>
		);
	} //end render

}

export default Follow;
