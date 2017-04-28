import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from "firebase";
import defaultUserPic from '../Default_User_Pic.svg';
import defaultBannerPic from '../Default_Banner_Pic.svg';
import "./layout.css";
import './icon-colors.css';

class EditUserProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userUpdated: this.props.initialState,
			bannerPhoto: this.props.bannerPhoto,
			displayNameText: '',
			user_file: '',
			user_imagePreviewUrl: '',
			user_imageUrl: '',
			banner_file: '',
			banner_imagePreviewUrl: '',
			banner_imageUrl: '',
			uploadBar: 'invisible'
		};
	}

	componentDidMount() {
		let user = firebase.auth().currentUser;
		if (user !== null) {
			this.setState({userId: user.uid, userName: user.displayName, userEmail: user.email, userPhoto: user.photoURL})
			const userId = user.uid;
			firebase.database().ref('users/' + userId + '/').child('bannerPhotoUrl').on('child_added', (res) => {
				const bannerPhoto = res.val();
				(bannerPhoto === '' || null)
					? this.setState({bannerPhoto: null})
					: this.setState({bannerPhoto: bannerPhoto})
			});
		}
	} //end componentDidMount

	handleEditBtnClick() {
		this.setState({userUpdated: true})
	} //end handleEditBtnClick

	handleProfileImgUpload = (evt) => {
		evt.preventDefault();
		let user_file = evt.target.files[0];
		let imageType = /image.*/;
		if (user_file.type.match(imageType)) {
			let profileImageReader = new FileReader();
			profileImageReader.onload = () => {
				let profileImage = new Image();
				profileImage.onload = () => {
					if (profileImage.width <= 512 && profileImage.height <= 512) {
						this.setState({user_file: user_file, user_imagePreviewUrl: profileImageReader.result});
					} else {
						alert("image must be 512px x 512px");
					}
				};
				profileImage.src = profileImageReader.result;
			};
			profileImageReader.readAsDataURL(user_file)
		} else {
			alert("File type not supported!")
		}
	} //end handleProfileImgUpload

	saveProfileImgUpload = (evt) => {
		evt.preventDefault();
		let userId = this.state.userId;
		let currentUserName = firebase.auth().currentUser.displayName;
		let currentPhoto = firebase.auth().currentUser.photoUrl;
		let selectedFile = this.state.user_file;
		let storageRef = firebase.storage().ref('/users/' + userId + '/profile-images/' + selectedFile.name);
		let uploadTask = storageRef.put(selectedFile);
		uploadTask.on('state_changed', (snapshot) => {
			let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			(progress < 100)
				? this.setState({uploadBar: 'visible'})
				: this.setState({uploadBar: 'invisible'});
		}, (error) => {
			// Handle unsuccessful uploads
			console.log(error);
		}, () => {
			// Handle successful uploads on complete
			let downloadURL = uploadTask.snapshot.downloadURL;
			let photoData = {
				photoUrl: downloadURL
			}
			currentPhoto = this.state.userPhoto;
			if (currentPhoto !== null) {
				let deleteImgRef = firebase.storage().refFromURL(currentPhoto);
				deleteImgRef.delete();
			}
			firebase.database().ref('/users/' + userId + '/').update(photoData);
			firebase.auth().currentUser.updateProfile({displayName: currentUserName, photoURL: downloadURL});
		});
	} //end saveProfileImgUpload

	removeProfileImgUpload = (evt) => {
		evt.preventDefault();
		ReactDOM.findDOMNode(this.refs.user_fileUpload).value = '';
		this.setState({user_file: '', user_imagePreviewUrl: ''});
	} //end removeProfileImgUpload

	handleBannerImgUpload = (evt) => {
		evt.preventDefault();
		let banner_file = evt.target.files[0];
		let imageType = /image.*/;
		if (banner_file.type.match(imageType)) {
			let bannerReader = new FileReader();
			bannerReader.onload = () => {
				let bannerImage = new Image();
				bannerImage.onload = () => {
					if (bannerImage.width === 1280 && bannerImage.height === 256) {
						this.setState({banner_file: banner_file, banner_imagePreviewUrl: bannerReader.result});
					} else {
						alert("image must be 1280px x 256px");
					}
				};
				bannerImage.src = bannerReader.result;
			};
			bannerReader.readAsDataURL(banner_file);
		} else {
			alert("File type not supported!")
		}
	} //end handleBannerImgUpload

	saveBannerImgUpload = (evt) => {
		evt.preventDefault();
		let userId = this.state.userId;
		let selectedBannerFile = this.state.banner_file;
		let storageRef = firebase.storage().ref('/users/' + userId + '/profile-images/' + selectedBannerFile.name);
		let uploadTask = storageRef.put(selectedBannerFile);
		uploadTask.on('state_changed', (snapshot) => {
			let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			(progress < 100)
				? this.setState({uploadBar: 'visible'})
				: this.setState({uploadBar: 'invisible'});
		}, (error) => {
			// Handle unsuccessful uploads
			console.log(error);
		}, () => {
			// Handle successful uploads on complete
			let downloadURL = uploadTask.snapshot.downloadURL;
			let bannerData = {
				bannerPhotoUrl: downloadURL
			}
			let currentBannerPhoto = this.state.bannerPhoto;
			if (currentBannerPhoto !== null) {
				let deleteImgRef = firebase.storage().refFromURL(currentBannerPhoto);
				deleteImgRef.delete();
			}
			firebase.database().ref('/users/' + userId + '/').update(bannerData);
		}); //end uploadTask
		firebase.database().ref('users/' + userId + '/').child('bannerPhotoUrl').on('child_changed', (res) => {
			const bannerPhoto = res.val();
			(bannerPhoto === '' || null)
				? this.setState({bannerPhoto: null})
				: this.setState({bannerPhoto: bannerPhoto})
		});
	} //end saveBannerImgUpload

	removeBannerImgUpload = (evt) => {
		evt.preventDefault();
		ReactDOM.findDOMNode(this.refs.banner_fileUpload).value = '';
		this.setState({banner_file: '', banner_imagePreviewUrl: ''});
	} //end removeBannerImgUpload

	handleSubmit(evt) {
		evt.preventDefault();
		let userId = this.state.userId;
		let currentPhoto = firebase.auth().currentUser.photoUrl;
		let newDisplayName = this.state.displayNameText;
		let input_chars = newDisplayName.length;
		if (input_chars > 0) {
			let displayNameData = {
				displayName: newDisplayName
			}
			currentPhoto = this.state.userPhoto;
			firebase.database().ref('/users/' + userId + '/').update(displayNameData);
			firebase.auth().currentUser.updateProfile({displayName: newDisplayName, photoURL: currentPhoto});
		}
		let newState = !this.state.userUpdated;
		this.props.callbackParent(newState);
	} //end handleSubmit

	handleNameInput = (evt) => {
		this.setState({displayNameText: evt.target.value})
	} //end handleNameInput

	handleCancel = (evt) => {
		let newState = !this.state.userUpdated;
		this.setState({userUpdated: newState});
		this.props.callbackParent(newState);
	} //end handleCancel

	profileImg = () => {
		let user_imagePreviewUrl = this.state.user_imagePreviewUrl;
		if (user_imagePreviewUrl) {
			return (
				<div>
					<img src={user_imagePreviewUrl} className="image is-128x128 image-rounded is-border-image-large" alt={this.state.user_file.name}/>
					<span className={`upload-bar ${this.state.uploadBar}`}>Updating photo...</span>
					<a className="remove icon-topright" onClick={this.removeProfileImgUpload} data-balloon="remove" data-balloon-pos="up">
						<span className="icon">
							<i className="fa fa-times" aria-hidden="true"></i>
						</span>
					</a>
					<a className="save icon-topleft" onClick={this.saveProfileImgUpload} data-balloon="save" data-balloon-pos="up">
						<span className="icon">
							<i className="fa fa-check" aria-hidden="true"></i>
						</span>
					</a>
				</div>
			);
		} else {
			return (
				<div>
					{(this.state.userPhoto === null)
						? <figure className="image is-128x128">
								<img src={defaultUserPic} alt="defaultProfilePic" className="image-rounded is-border-image-large"/>
							</figure>
						: <figure className="image is-128x128">
							<img src={this.state.userPhoto} alt="profilePic" className="image-rounded is-border-image-large"/>
						</figure>}
					<a className="icon-centered editImg">
						<i className="fa fa-camera-retro fa-2x" aria-hidden="true"></i>
						<p className="profileImg-text-white">Change Profile Photo</p>
					</a>
				</div>
			);
		}
	} //end profileImg

	bannerImg = () => {
		let banner_imagePreviewUrl = this.state.banner_imagePreviewUrl;
		if (banner_imagePreviewUrl) {
			return (
				<div>
					<img src={banner_imagePreviewUrl} alt={this.state.banner_file.name}/>
					<span className={`upload-bar ${this.state.uploadBar}`}>Updating banner...</span>
					<a className="remove banner-topright" onClick={this.removeBannerImgUpload}>
						<span className="icon">
							<i className="fa fa-times" aria-hidden="true"></i>
						</span>
					</a>
					<a className="save banner-topleft" onClick={this.saveBannerImgUpload}>
						<span className="icon">
							<i className="fa fa-check" aria-hidden="true"></i>
						</span>
					</a>
				</div>
			);
		} else {
			return (
				<div>
					{(this.state.bannerPhoto === null)
						? <figure className="image">
								<img src={defaultBannerPic} alt="defaultBannerPic"/>
							</figure>
						: <figure className="image">
							<img src={this.state.bannerPhoto} alt="bannerPic"/>
						</figure>}
					<a className="banner-icon-centered editImg">
						<i className="fa fa-camera-retro fa-2x" aria-hidden="true"></i>
						<p className="banner-text-white">Change Profile Banner Photo</p>
					</a>
				</div>
			);
		}
	} //end bannerImg

	render() {
		return (
			<header>
				<form className="profile-card-large" onSubmit={this.handleSubmit.bind(this)}>
					<div className="card-image">
						<div className="control">
							<input type="file" accept="image/*" name="banner_fileUploader" ref="banner_fileUpload" id="banner_fileUpload" className="input-file" onChange={this.handleBannerImgUpload}/>
							<label htmlFor="banner_fileUpload">
								{this.bannerImg()}
							</label>
						</div>
					</div>
					<div className="card-content">
						<div className="media user-profile-media-edit">
							<div className="media-left">
								<div className="field">
									<div className="control">
										<input type="file" accept="image/*" name="user_fileUploader" ref="user_fileUpload" id="user_fileUpload" className="input-file" onChange={this.handleProfileImgUpload}/>
										<label htmlFor="user_fileUpload">
											{this.profileImg()}
										</label>
									</div>
								</div>
							</div>
							<div className="media-content">
								<label className="label">Change Display Name</label>
								<div className="form-leveled">
									<p className="control grow-item">
										<input defaultValue={this.state.userName} placeholder={this.state.userName} className='input' onChange={this.handleNameInput.bind(this)}/>
									</p>
									<div className="narrow-item">
										<button className="button is-primary is-outlined" type="submit">
											<span className="icon is-small is-hidden-mobile">
												<i className="fa fa-cloud fa-fw" aria-hidden="true"/>
											</span>
											<span>Save</span>
										</button>
									</div>
									<div className="narrow-item">
										<button className="button is-light is-outlined" type="button" onClick={this.handleCancel.bind(this)}>
											<span className="icon is-small is-hidden-mobile">
												<i className="fa fa-ban fa-fw" aria-hidden="true"/>
											</span>
											<span>Cancel</span>
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</form>
			</header>
		);
	} //end Render

}

export default EditUserProfile;
