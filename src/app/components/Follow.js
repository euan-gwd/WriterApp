import React from 'react';
import * as firebase from 'firebase';
import defaultUserPic from '../Default_User_Pic.svg';
import "./layout.css";
import './icon-colors.css';

class Follow extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userId: null,
			userName: null,
			userPhoto: null,
			following: null
		};
	}; //end constructor

	componentDidMount() {
		let users = this.props.Users;
		let usrId;
		const dbRootRef = firebase.database().ref('users/' + users);
		dbRootRef.on('value', (snap) => {
			let followerData = snap.val();
			usrId = snap.key;
			let {displayName, photoUrl} = followerData;
			(photoUrl === "")
				? this.setState({userName: displayName, userPhoto: null, userId: usrId})
				: this.setState({userName: displayName, userPhoto: photoUrl, userId: usrId});
		});
		let uid = usrId;
		let userId = firebase.auth().currentUser.uid;
		let followerRef = firebase.database().ref('users/' + userId + '/following/' + uid);
		followerRef.on('value', (data) => {
			console.log(data.val());
			(data.val())
				? this.setState({following: "unfollow"})
				: this.setState({following: "follow"});
		})
	} //end componentDidMount

	updateFollowingState(uid) {
		let userId = firebase.auth().currentUser.uid;
		let followerRef = firebase.database().ref('users/' + userId + '/following/' + uid);
		followerRef.on('value', (data) => {
			console.log(data.val());
			(data.val())
				? this.setState({following: "unfollow"})
				: this.setState({following: "follow"});
		})
	} // end updateFollowingState

	followWriter = (evt) => {
		this.toggleFollow(this.state.userId);
		this.updateFollowingState(this.state.userId);
	} //end followWriter

	toggleFollow(uid) {
		let userId = firebase.auth().currentUser.uid;
		let usersRef = firebase.database().ref('users/' + userId + '/');
		usersRef.transaction(function (user) {
			if (user) {
				if (!user.following) {
					user.following = {};
				}
				if (user.following && user.following[uid]) {
					user.followingCount--;
					user.following[uid] = null;
				} else {
					user.followingCount++;
					user.following[uid] = true;
				}
			}
			return user;
		}) // end mainTL transaction

		let itemRef = firebase.database().ref('users/' + uid + '/');
		itemRef.transaction(function (user) {
			if (user) {
				if (!user.follower) {
					user.follower = {};
				}
				if (user.follower && user.follower[userId]) {
					user.followerCount--;
					user.follower[userId] = null;
				} else {
					user.followerCount++;
					user.follower[userId] = true;
				}
			}
			return user;
		}) // end end userTL transaction
	}; // end toggleFollow

	render() {
		let currentUser = firebase.auth().currentUser.uid;
		return (
			<div>
				{(this.state.userId !== currentUser)
					? <div className="selected-scribe mb">
							<div className="media">
								<div className="media-left">
									{(this.state.userPhoto === null)
										? <figure className="image is-32x32">
												<img src={defaultUserPic} alt="defaultProfilePic" className="image-rounded"/>
											</figure>
										: <figure className="image is-32x32">
											<img src={this.state.userPhoto} alt="profilePic" className="image-rounded"/>
										</figure>}
								</div>
								<div className="media-content">
									<p className="subtitle is-6">{this.state.userName}</p>
								</div>
								<div className="media-right">
									<a className={this.state.following} data-balloon={this.state.following} data-balloon-pos="left" onClick={this.followWriter.bind(this)}>
										{(this.state.following === "follow")
											? <span className="icon is-medium">
													<i className="fa fa-user-plus" aria-hidden="true"></i>
												</span>
											: <span className="icon is-medium">
												<i className="fa fa-user-times" aria-hidden="true"></i>
											</span>}
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
