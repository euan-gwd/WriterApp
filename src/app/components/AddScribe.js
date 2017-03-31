import React from 'react';
import ReactDOM from 'react-dom';
// import base from '../rebase.config';
import base from '../firebase.config';
import "./scribes.css";

class AddScribe extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      bodyText: '',
      date: new Date().toISOString(),
      file: '',
      imagePreviewUrl: '',
      imageUrl: '',
      uploadBar: 'invisible'
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({date: new Date().toISOString()});
  }

  handleSubmit(evt) {
    evt.preventDefault();
    let file = this.state.file;
    let userId = this.props.userId;
    let scribeText = this.state.bodyText;
    let datetime = this.state.date;
    let userName = this.props.userName;
    let userEmail = this.props.userEmail;
    let userPhoto = this.props.userPhoto;
    let chars_left = 160 - this.state.bodyText.length;

    if (file !== '' && chars_left >= 0) {
      let storageRef = base.storage().ref('/images/' + userId + '/' + file.name);
      let uploadTask = storageRef.put(file);
      uploadTask.on('state_changed', (snapshot) => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        (progress < 100)
          ? this.setState({uploadBar: 'visible'})
          : this.setState({uploadBar: 'invisible'});
      }, (error) => {
        // Handle unsuccessful uploads
      }, () => {
        // Handle successful uploads on complete
        let newScribeKey = base.database().ref('mainTL/').push().key;
        let downloadURL = uploadTask.snapshot.downloadURL;
        let updates = {};
        let scribeData = {
          scribe: scribeText,
          scribeImage: downloadURL,
          datetime: datetime,
          userId: userId,
          userName: userName,
          userEmail: userEmail,
          userPhoto: userPhoto,
          likes: 0
        }
        updates['/mainTL/' + newScribeKey] = scribeData;
        updates['/userTL/' + userId + '/' + newScribeKey] = scribeData;
        base.database().ref().update(updates);
        this.setState({uploadBar: 'invisible'});
      });
    } else {
      if (chars_left >= 0) {
        let newScribeKey = base.database().ref('mainTL/').push().key;
        let updates = {};
        let scribeData = {
          scribe: scribeText,
          datetime: datetime,
          userId: userId,
          userName: userName,
          userEmail: userEmail,
          userPhoto: userPhoto,
          likes: 0
        }
        updates['/mainTL/' + newScribeKey] = scribeData;
        updates['/userTL/' + userId + '/' + newScribeKey] = scribeData;
        base.database().ref().update(updates);
      }
    }
    ReactDOM.findDOMNode(this.refs.scribe).value = '';
    this.setState({file: '', imagePreviewUrl: '', bodyText: ''});
  }

  handleInput = (evt) => {
    this.setState({bodyText: evt.target.value});
  }

  handleImgUpload = (evt) => {
    evt.preventDefault();
    let reader = new FileReader();
    let file = evt.target.files[0];
    reader.onloadend = () => {
      this.setState({file: file, imagePreviewUrl: reader.result});
    }
    reader.readAsDataURL(file)
  }

  removeImgUpload = (evt) => {
    evt.preventDefault();
    ReactDOM.findDOMNode(this.refs.fileUpload).value = '';
    this.setState({file: '', imagePreviewUrl: ''});
  }

  render() {
    let $imagePreview = null;
    let imagePreviewUrl = this.state.imagePreviewUrl;
    if (imagePreviewUrl) {
      $imagePreview = (
        <div className="imagePreview-Wrapper">
          <img src={imagePreviewUrl} className="image is-128x128 image-rounded" alt={this.state.file.name}/>
          <a className="topright" onClick={this.removeImgUpload}>
            <span className="icon">
              <i className="fa fa-times" aria-hidden="true"></i>
            </span>
          </a>
        </div>
      );
    } else {
      $imagePreview = null;
    }
    return (
        <form onSubmit={this.handleSubmit.bind(this)} className='card'>
          <article className="media">
            <div className="media-left">
              {(this.props.userPhoto === null)
                ? <i className="fa fa-user-circle-o fa-2x" aria-hidden="true"></i>
                : <figure className="image is-48x48">
                  <img src={this.props.userPhoto} alt="profilePic" className="image-rounded"/>
                </figure>}
            </div>
            <div className="media-content">
              <div className="">
                <div className="control">
                  {$imagePreview}
                  <textarea ref='scribe' defaultValue={this.state.bodyText} placeholder="What's happening?" className='textarea' onChange={this.handleInput.bind(this)} required/>
                  <span className={`upload-bar ${this.state.uploadBar}`}>Sending Scribe now...</span>
                </div>
              </div>
              <div className="pt">
                <div className="columns is-mobile is-gapless">
                  <div className="column is-narrow">
                    <div className="control">
                      <input type="file" accept="image/*" name="fileUploader" ref="fileUpload" id="fileUpload" className="input-file" onChange={this.handleImgUpload}/>
                      <label htmlFor="fileUpload" className="button is-light" type="button">
                        <i className="fa fa-camera" aria-hidden="true"/>
                      </label>
                    </div>
                  </div>
                  <div className="column has-text-right char-count">
                    <div className="pr">{160 - this.state.bodyText.length}</div>
                  </div>
                  <div className="column is-narrow">
                    <button className="button is-primary" type="submit" disabled={this.state.bodyText.length === 0}>
                      <span className="icon is-hidden-mobile">
                        <i className="fa fa-pencil-square-o fa-fw" aria-hidden="true"/>
                      </span>
                      <span>Scribe</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </form>
    );
  }

}

export default AddScribe;
