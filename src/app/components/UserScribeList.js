import React from 'react';
import * as firebase from "firebase";
import UserScribe from './UserScribe';
import "./layout.css";
import './icon-colors.css';

class UserScribeList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userScribe: [],
			starred: false
		};
	};

	componentDidMount() {
		// load current user and retrieve user profile data from firebase for currentUser
		let user = firebase.auth().currentUser;
		//retrieve user profile data from firebase for currentUser
		if (user !== null) {
			this.setState({userId: user.uid, userName: user.displayName, userEmail: user.email, userPhoto: user.photoURL})
		}
		//retrieve all scribes from firebase for the currentUser
		const keyRef = user.uid;
		firebase.database().ref('userTL/' + keyRef + '/').on('value', (res) => {
			const userScribeData = res.val();
			const userScribeDataArray = [];
			for (let objKey in userScribeData) {
				userScribeData[objKey].key = objKey;
				userScribeDataArray.push(userScribeData[objKey])
			}
			this.setState({userScribe: userScribeDataArray})
		});
	} // end componentDidMount

	componentWillUnmount() {
		const keyRef = firebase.auth().currentUser.uid;
		firebase.database().ref('userTL/' + keyRef + '/').off();
	} // end componentWillUnmount

	deleteScribe(item, evt) {
		evt.stopPropagation();
		let userId = this.state.userId;
		let userTLRef = firebase.database().ref('userTL/' + userId + '/');
		if (item.hasOwnProperty("scribeImage")) {
			let deleteImgRef = firebase.storage().refFromURL(item.scribeImage);
			if (window.confirm("Do you really want to delete this?")) {
				userTLRef.child(item.key).remove(); //removes item from firebase RTdatabase
				deleteImgRef.delete(); //removes item from storageBucket
			}
		} else {
			if (window.confirm("Do you really want to delete this?")) {
				userTLRef.child(item.key).remove(); //removes item from firebase RTdatabase
			}
		}
	} // end deleteScribe

	// likes click handler
	toggleLikes(item, evt) {
		evt.preventDefault();
		let mainTLRef = firebase.database().ref('mainTL/' + item.key + '/');
		let userTLRef = firebase.database().ref('userTL/' + item.userId + '/' + item.key);
		let uid = firebase.auth().currentUser.uid;

		// handles implementation of starCount for mainTL
		mainTLRef.transaction(function (post) {
			if (post) {
				if (post.stars && post.stars[uid]) {
					post.starCount--;
					post.stars[uid] = null;
				} else {
					post.starCount++;
					if (!post.stars) {
						post.stars = {};
					}
					post.stars[uid] = true;
				}
			}
			return post;
		}); // end mainTL transaction

		// handles implementation of starCount for userTL
		userTLRef.transaction(function (post) {
			if (post) {
				if (post.stars && post.stars[uid]) {
					post.starCount--;
					post.stars[uid] = null;
				} else {
					post.starCount++;
					if (!post.stars) {
						post.stars = {};
					}
					post.stars[uid] = true;
				}
			}
			return post;
		}); // end end userTL transaction
	} // end toggleFollow

		reportScribe(item, evt) {
			evt.preventDefault();
			console.log(item);
		} // end report Scribe

	render() {
		let userScribe = this.state.userScribe.map((item) => {
			return (<UserScribe thread={item} removeScribe={this.deleteScribe.bind(this, item)} favScribe={this.toggleLikes.bind(this, item)} reportScribe={this.reportScribe.bind(this, item)} key={item.key}/>);
		});
		return (
			<div className="scribe-container">
				<div className="columns pt-1">
					<div className="column is-6 is-offset-3">
						<ul id="userScribeList">{userScribe}</ul>
					</div>
				</div>
			</div>
		);
	}
}

export default UserScribeList;
