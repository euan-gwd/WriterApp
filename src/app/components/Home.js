import React from 'react';
import * as firebase from 'firebase';
import AddScribe from './AddScribe';
import Scribe from './Scribe';
import Follow from './Follow';
import defaultUserPic from '../Default_User_Pic.svg';
import defaultBannerPic from '../Default_Banner_Pic.svg';
import "./layout.css";
import './colors.css';

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			scribes: [],
			starred: false,
			usersList: [],
			totalUserScribes: 0
		};
	};

	componentDidMount() {
		let user = firebase.auth().currentUser;
		// load current user and retrieve user profile data from firebase for currentUser
		if (user !== null) {
			//retrieve user profile data from firebase for currentUser
			this.setState({userId: user.uid, userName: user.displayName, userEmail: user.email, userPhoto: user.photoURL})
			const userId = user.uid;
			firebase.database().ref('users/' + userId + '/').child('bannerPhotoUrl').once('value', (res) => {
				const bannerPhoto = res.val();
				this.setState({bannerPhoto: bannerPhoto})
			});
			// retrieve total number of scribes for currentUser
			firebase.database().ref('userTL/' + userId + '/').once('value', (res) => {
				const userScribeData = res.val();
				let totalScribes = Object.keys(userScribeData).length;
				this.setState({totalUserScribes: totalScribes});
			});
			//retrieve all scribes from firebase
			firebase.database().ref('mainTL').on('value', (res) => {
				const scribeData = res.val();
				const scribeDataArray = [];
				for (let objKey in scribeData) {
					scribeData[objKey].key = objKey;
					scribeDataArray.push(scribeData[objKey])
				}
				this.setState({scribes: scribeDataArray})
			});
			// retrieve list of users from firebase
			firebase.database().ref('users/').once('value', (res) => {
				const usersData = res.val();
				let userList = Object.keys(usersData);
				this.setState({usersList: userList});
			});
		}
	};

	//remove listener
	componentWillUnmount() {
		firebase.database().ref('mainTL').off();
	}

	// deletes scribe
	deleteScribe(item, evt) {
		evt.stopPropagation();
		let userId = this.state.userId;
		let mainTLRef = firebase.database().ref('mainTL/');
		let userTLRef = firebase.database().ref('userTL/' + userId + '/');
		if (item.hasOwnProperty("scribeImage")) {
			let deleteImgRef = firebase.storage().refFromURL(item.scribeImage);
			if (window.confirm("Do you really want to delete this?")) {
				mainTLRef.child(item.key).remove(); //removes item from firebase RTdatabase
				userTLRef.child(item.key).remove(); //removes item from firebase RTdatabase
				deleteImgRef.delete(); //removes item from storageBucket
			}
		} else {
			if (window.confirm("Do you really want to delete this?")) {
				mainTLRef.child(item.key).remove(); //removes item from firebase RTdatabase
				userTLRef.child(item.key).remove(); //removes item from firebase RTdatabase
			}
		}
	}

	// add likes
	incrementAndSave(mainDbRef, userDbRef) {
		mainDbRef.transaction(star => star + 1);
		userDbRef.transaction(star => star + 1);
		this.setState({starred: true});
	}

	// remove likes
	decrementAndSave(mainDbRef, userDbRef) {
		mainDbRef.transaction(star => star - 1);
		userDbRef.transaction(star => star - 1);
		this.setState({starred: false});
	}

	// likes click handler
	toggleLikes(item, evt) {
		evt.stopPropagation();
		let userId = this.state.userId;
		let mainDbRef = firebase.database().ref('mainTL/').child(item.key).child('likes');
		let userDbRef = firebase.database().ref('userTL/' + userId + '/').child(item.key).child('likes');
		(this.state.starred === true)
			? this.decrementAndSave(mainDbRef, userDbRef)
			: this.incrementAndSave(mainDbRef, userDbRef)
	}

	render() {
		//Display all scribes to screen
		let scribes = this.state.scribes.map((item) => {
			return (<Scribe thread={item} removeScribe={this.deleteScribe.bind(this, item)} favScribe={this.toggleLikes.bind(this, item)} key={item.key}/>);
		})
		//Display all users to screen
		let usr = this.state.usersList.map((item, index) => {
			return (<Follow UserID={item} key={index}/>);
		})
		return (
			<div className="scribe-container">
				<div className="scribe-layout pt-1">
					<div className="">
						<div className="profile-card is-hidden-mobile">
							<div className="card-image">
								{(this.state.bannerPhoto === null)
									? <figure className="image">
											<img src={defaultBannerPic} alt="defaultBannerPic" className="image-top-borders-rounded"/>
										</figure>
									: <figure className="image">
										<img src={this.state.bannerPhoto} alt="bannerPic" className="image-top-borders-rounded"/>
									</figure>}
							</div>
							<div className="card-content">
								<div className="media">
									<div className="media-left">
										{(this.state.userPhoto === null)
											? <figure className="image is-48x48 is-border-image">
													<img src={defaultUserPic} alt="defaultProfilePic" className="image-rounded"/>
												</figure>
											: <figure className="image is-48x48 is-border-image">
												<img src={this.state.userPhoto} alt="profilePic" className="image-rounded"/>
											</figure>}
									</div>
									<div className="media-content">
										<p className="title is-5 pr">{this.state.userName}</p>
										<p className="subtitle is-6 lh-1">{this.state.userEmail}</p>
									</div>
								</div>
								<footer className="leveled">
									<div className="has-text-left">
										<div className="pr-1">
											<p className="subtitle-text-is-2 lh-1">Scribes</p>
											<p className="text-is-primary">{this.state.totalUserScribes}</p>
										</div>
									</div>
									<div className="has-text-left">
										<div className="">
											<p className="subtitle-text-is-2 lh-1">Following</p>
											<p className="text-is-primary">123</p>
										</div>
									</div>
									<div className="has-text-left">
										<div className="pl-1">
											<p className="subtitle-text-is-2 lh-1">Followers</p>
											<p className="text-is-primary">456K</p>
										</div>
									</div>
								</footer>
							</div>
						</div>
					</div>
					<div className="">
						<AddScribe mainTL={this.state.scribes} userName={this.state.userName} userId={this.state.userId} userEmail={this.state.userEmail} userPhoto={this.state.userPhoto}/>
						<ul className="">{scribes}</ul>
					</div>
					<div className="">
						<div className="follow-card">
							<h6 className="title is-5 borderline">Writers:</h6>
							<div>{usr}</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Home;
