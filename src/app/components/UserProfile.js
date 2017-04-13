import React from 'react';
import * as firebase from "firebase";
import EditUserProfile from './EditUserProfile.js';
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

  onEdited(newState) {
    this.setState({userUpdated: newState})
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
          : <EditUserProfile initialState={this.state.userUpdated} callbackParent={(newState) => this.onEdited(newState)}/>}
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
