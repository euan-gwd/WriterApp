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
		let users = this.props.User;
		const dbRootRef = firebase.database().ref('users/' + users);
		dbRootRef.on('value', (snap) => {
			let followerData = snap.val();
			let usrId = snap.key;
			let {displayName, photoUrl} = followerData;
			(photoUrl === "")
				? this.setState({userName: displayName, userPhoto: null, userId: usrId})
				: this.setState({userName: displayName, userPhoto: photoUrl, userId: usrId});
			if (followerData.hasOwnProperty('following') === false) {
				this.setState({following: "follow"});
			} else {
					console.log(followerData);
			}
		});
	} //end componentDidMount

	updateFollowingState() {
		if (this.state.following === "follow") {
			this.setState({following: "unfollow"})
		} else if (this.state.following === "unfollow") {
			this.setState({following: "follow"})
		}
	} // end updateFollowingState

	followWriter = (evt) => {
		evt.preventDefault();
		this.props.followUser(this.state.userId);
		this.updateFollowingState();
	} //end followWriter

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
									<a className={this.state.following} data-balloon={this.state.following} data-balloon-pos="left" onClick={this.followWriter}>
										{(this.state.following === "unfollow")
											? <span className="icon is-medium">
													<i className="fa fa-user-times" aria-hidden="true"></i>
												</span>
											: <span className="icon is-medium">
												<i className="fa fa-user-plus" aria-hidden="true"></i>
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
