import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from "firebase";
import "./layout.css";
import './colors.css';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userUpdated: false,
      userId: null,
      userName: null,
      userEmail: null,
      userPhoto: null,
      bannerPhoto: 'http://lorempixel.com/1280/256/',
      user_file: '',
      user_imagePreviewUrl: '',
      user_imageUrl: '',
      banner_file: '',
      banner_imagePreviewUrl: '',
      banner_imageUrl: ''
    };
  }

  componentDidMount() {
    let user = firebase.auth().currentUser;
    if (user != null) {
      this.setState({userId: user.uid, userName: user.displayName, userEmail: user.email, userPhoto: user.photoURL})
    }
  }

  handleEditBtnClick() {
    this.setState({userUpdated: true})
  }

  handleProfileImgUpload = (evt) => {
    evt.preventDefault();
    let reader = new FileReader();
    let user_file = evt.target.files[0];
    reader.onloadend = () => {
      this.setState({user_file: user_file, user_imagePreviewUrl: reader.result});
    }
    reader.readAsDataURL(user_file)
  }

  removeProfileImgUpload = (evt) => {
    evt.preventDefault();
    ReactDOM.findDOMNode(this.refs.user_fileUpload).value = '';
    this.setState({user_file: '', user_imagePreviewUrl: ''});
  }

  handleBannerImgUpload = (evt) => {
    evt.preventDefault();
    let reader = new FileReader();
    let banner_file = evt.target.files[0];
    reader.onloadend = () => {
      this.setState({banner_file: banner_file, banner_imagePreviewUrl: reader.result});
    }
    reader.readAsDataURL(banner_file)
  }

  removeBannerImgUpload = (evt) => {
    evt.preventDefault();
    ReactDOM.findDOMNode(this.refs.banner_fileUpload).value = '';
    this.setState({banner_file: '', banner_imagePreviewUrl: ''});
  }

  handleSubmit(evt) {
    evt.preventDefault();
    let user = firebase.auth().currentUser;
    let userId = firebase.auth().currentUser.uid;
    let displayName = this.state.userName;
    let file = this.state.user_file;
    let chars_left = this.state.user_name.length;

    if (file !== '' && chars_left >= 0) {
      let storageRef = firebase.storage().ref('/images/' + userId + '/profile-images/' + file.name);
      let uploadTask = storageRef.put(file);
      uploadTask.on('state_changed', (snapshot) => {}, (error) => {
        // Handle unsuccessful uploads
        console.log(error);
      }, () => {
        // Handle successful uploads on complete
        let downloadURL = uploadTask.snapshot.downloadURL;
        user.updateProfile({displayName: displayName, photoURL: downloadURL})
      });
    }
  }

  handleNameInput = (evt) => {
    this.setState({userName: evt.target.value})
  }

  handleCancel = (evt) => {
    evt.preventDefault();
    this.setState({userUpdated: false});
  }

  profileImg = () => {
    let user_imagePreviewUrl = this.state.user_imagePreviewUrl;
    if (user_imagePreviewUrl) {
      return (
        <div>
          <img src={user_imagePreviewUrl} className="image is-128x128 image-rounded is-border-image-large" alt={this.state.user_file.name}/>
          <a className="remove icon-topright" onClick={this.removeProfileImgUpload} data-balloon="undo" data-balloon-pos="up">
            <span className="icon">
              <i className="fa fa-times" aria-hidden="true"></i>
            </span>
          </a>
        </div>
      );
    } else {
      return (
        <div>
          <img src={this.state.userPhoto} className="image is-128x128 image-rounded is-border-image-large" alt={this.state.user_file.name}/>
          <a className="icon-centered editImg">
            <i className="fa fa-camera-retro fa-2x" aria-hidden="true"></i>
            <p className="profileImg-text-white">Change Profile Photo</p>
          </a>
        </div>
      );
    }
  }

  bannerImg = () => {
    let banner_imagePreviewUrl = this.state.banner_imagePreviewUrl;
    if (banner_imagePreviewUrl) {
      return (
        <div>
          <img src={banner_imagePreviewUrl} alt={this.state.banner_file.name}/>
          <a className="remove icon-topright" onClick={this.removeBannerImgUpload} data-balloon="undo" data-balloon-pos="up">
            <span className="icon">
              <i className="fa fa-times" aria-hidden="true"></i>
            </span>
          </a>
        </div>
      );
    } else {
      return (
        <div>
          <img src={this.state.bannerPhoto} alt={this.state.banner_file.name}/>
          <a className="banner-icon-centered editImg">
            <i className="fa fa-camera-retro fa-2x" aria-hidden="true"></i>
            <p className="banner-text-white">Change Profile Banner Photo</p>
          </a>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {(this.state.userUpdated === false)
          ? <div className="profile-card-large">
              <div className="card-image">
                <div className="control">
                  <figure className="image">
                    <img src={this.state.bannerPhoto} alt={this.state.banner_file.name}/>
                  </figure>
                </div>
              </div>
              <div className="card-content">
                <div className="media user-profile-media">
                  <div className="media-left">
                    <figure className="image is-128x128">
                      <img src={this.state.userPhoto} className="is-border-image-large" alt={this.state.user_file.name}/>
                    </figure>
                  </div>
                  <div className="media-content">
                    <div className="banner-leveled">
                      <p className="title is-5 pr">{this.state.userName}</p>
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
            </div>
          : <form className="profile-card-large" onSubmit={this.handleSubmit.bind(this)}>
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
                      <span className="help is-primary has-text-centered" id="uploadBar" ref="uploadNotif">Updating user now...</span>
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
          </form>}
        <main className="user-scribe-container">
          <div className="columns pt-1">
            <div className="column is-half is-offset-one-quarter">
              UserScribeList Component Placeholder
            </div>
          </div>
        </main>
      </div>
    );
  }

}

export default UserProfile;
