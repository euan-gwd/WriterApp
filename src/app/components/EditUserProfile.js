import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from "firebase";
import './scribes.css';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // userUpdated: this.props.initialState,
      userId: null,
      userName: null,
      userEmail: null,
      userPhoto: null,
      user_file: '',
      user_imagePreviewUrl: '',
      user_imageUrl: ''
    };
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

  handleSubmit(evt) {
    evt.preventDefault();
    let user = firebase.auth().currentUser;
    let userId = firebase.auth().currentUser.uid;
    let displayName = this.state.userName;
    let file = this.state.user_file;
    let chars_left = this.state.user_name.length;

    if (file !== '' && chars_left >= 0) {
      let storageRef = firebase.storage().ref('/images/' + userId + '/' + file.name);
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

  componentDidMount() {
    let user = firebase.auth().currentUser;
    if (user != null) {
      this.setState({userId: user.uid, userName: user.displayName, userEmail: user.email, userPhoto: user.photoURL})
    }
  }

  handleNameInput = (evt) => {
    this.setState({userName: evt.target.value})
  }

  // handleCancel = (evt) => {
  //   const newState = !this.state.userUpdated;
  //   this.setState({ userUpdated: newState });
  //   this.props.callbackParent(newState);
  // }

  render() {
    let $userImagePreview = null;
    let user_imagePreviewUrl = this.state.user_imagePreviewUrl;
    if (user_imagePreviewUrl) {
      $userImagePreview = (
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
      $userImagePreview = (
        <div>
          <img src={this.state.userPhoto} className="image is-128x128 image-rounded is-border-image-large" alt={this.state.user_file.name}/>
          <a className="icon-centered edit" data-balloon="upload new photo" data-balloon-pos="up">
            <i className="fa fa-camera-retro fa-2x" aria-hidden="true"></i>
          </a>
        </div>
      );
    }
    return (
      <div className="profile-card-large">
        <div className="card-image">
          <figure className="image ">
            <img src="http://lorempixel.com/1200/256/" alt="CardImage"/>
          </figure>
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <div className="field">
                <div className="control">
                  <input type="file" accept="image/*" name="user_fileUploader" ref="user_fileUpload" id="user_fileUpload" className="input-file" onChange={this.handleProfileImgUpload}/>
                  <label htmlFor="user_fileUpload">
                    {$userImagePreview}
                  </label>
                </div>
              </div>
            </div>
            <form className="media-content">
              <div className="field">
                <label className="label">Display Name</label>
                <p className="control">
                  <input defaultValue={this.state.userName} placeholder={this.state.userName} className='input' onChange={this.handleNameInput.bind(this)}/>
                  <span className="help is-primary has-text-centered" id="uploadBar" ref="uploadNotif">Updating user now...</span>
                </p>
              </div>
              <div className="">
                <div className="columns is-mobile">
                  <div className="column is-narrow">
                    <button className="button is-primary" type="submit">
                      <span className="icon is-small is-hidden-mobile">
                        <i className="fa fa-cloud fa-fw" aria-hidden="true"/>
                      </span>
                      <span>Save</span>
                    </button>
                  </div>
                  <div className="column is-narrow">
                        <button className="button is-light" type="button">
                          <span className="icon is-small is-hidden-mobile">
                            <i className="fa fa-ban fa-fw" aria-hidden="true" />
                          </span>
                          <span>Cancel</span>
                        </button>
                      </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

}

export default UserProfile;
