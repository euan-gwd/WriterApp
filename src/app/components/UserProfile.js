import React from 'react';
import * as firebase from "firebase";
import EditUserProfile from './EditUserProfile';
import UserScribeList from './UserScribeList';
import defaultUserPic from '../Default_User_Pic.svg';
import defaultBannerPic from '../Default_Banner_Pic.svg';
import "./layout.css";
import './icon-colors.css';

class UserProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userUpdated: false,
			user_file: '',
			user_imagePreviewUrl: '',
			user_imageUrl: '',
			banner_file: '',
			banner_imagePreviewUrl: '',
			banner_imageUrl: ''
		};
	}

	componentDidMount() {
		// load current user and retrieve user profile data from firebase for currentUser
		let user = firebase.auth().currentUser;
		this.setState({userId: user.uid, userName: user.displayName, userEmail: user.email, userPhoto: user.photoURL})
		const userId = user.uid;
		firebase.database().ref('users/' + userId + '/').child('bannerPhotoUrl').once('value', (res) => {
			const bannerPhoto = res.val();
			this.setState({bannerPhoto: bannerPhoto})
		});

		// retrieve total following count
		firebase.database().ref('users/' + userId + '/').child('followingCount').on('value', (res) => {
			const totalFollowing = res.val();
			this.setState({followingTotal: totalFollowing})
		});
		// retrieve total follower count
		firebase.database().ref('users/' + userId + '/').child('followerCount').on('value', (res) => {
			const totalFollowers = res.val();
			this.setState({followersTotal: totalFollowers})
		});

		// retrieve total number of scribes for currentUser
		firebase.database().ref('userTL/' + userId + '/').once('value', (res) => {
			const userScribeData = res.val();
			let totalScribes;
			(userScribeData !== null)
				? totalScribes = Object.keys(userScribeData).length
				: totalScribes = 0;
			this.setState({totalUserScribes: totalScribes});
		});
	}

	handleEditBtnClick() {
		this.setState({userUpdated: true})
	}

	onEdited(newState) {
		this.setState({userUpdated: newState})
	}

	render() {
		return (
			<div>
				{(this.state.userUpdated === false)
					? <header className="profile-card-large">
							<div className="card-image">
								<div className="control">
									{(this.state.bannerPhoto === null)
										? <figure className="image">
												<img src={defaultBannerPic} alt="defaultBannerPic"/>
											</figure>
										: <figure className="image">
											<img src={this.state.bannerPhoto} alt="bannerPic"/>
										</figure>}
								</div>
							</div>
							<div className="card-content">
								<div className="media user-profile-media">
									<div className="media-left">
										{(this.state.userPhoto === null)
											? <figure className="image is-128x128">
													<img src={defaultUserPic} alt="defaultProfilePic" className="is-border-image-large"/>
												</figure>
											: <figure className="image is-128x128">
												<img src={this.state.userPhoto} alt="profilePic" className="is-border-image-large"/>
											</figure>}
									</div>
									<div className="media-content">
										<div className="banner-leveled">
											<p className="title is-5 pr">{this.state.userName}</p>
											<div className="followers-leveled">
												<div className="has-text-centered">
													<div className="pr-1">
														<p className="subtitle-text-is-2 lh-1">Scribes</p>
														<p className="text-is-primary">{this.state.totalUserScribes}</p>
													</div>
												</div>
												<div className="has-text-centered">
													<div className="">
														<p className="subtitle-text-is-2 lh-1">Following</p>
														<p className="text-is-primary">{this.state.followingTotal}</p>
													</div>
												</div>
												<div className="has-text-centered">
													<div className="pl-1">
														<p className="subtitle-text-is-2 lh-1">Followers</p>
														<p className="text-is-primary">{this.state.followersTotal}</p>
													</div>
												</div>
											</div>
											<button className="button is-primary is-outlined" onClick={this.handleEditBtnClick.bind(this)}>
												<span className="icon is-small is-hidden-mobile">
													<i className="fa fa-cloud-upload fa-fw" aria-hidden="true"/>
												</span>
												<span>Edit Profile</span>
											</button>
										</div>
									</div>
								</div>
							</div>
						</header>
					: <EditUserProfile bannerPhoto={this.state.bannerPhoto} initialState={this.state.userUpdated} callbackParent={(newState) => this.onEdited(newState)}/>}
				<main>
					<UserScribeList/>
				</main>
			</div>
		);
	}

}

export default UserProfile;
