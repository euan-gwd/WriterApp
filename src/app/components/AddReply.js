import React from 'react';
import ReactDOM from 'react-dom';
import base from '../rebase.config';
import "./scribes.css";

class AddReply extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      replied: this.props.initialState,
      bodyText: '',
      date: new Date().toLocaleString(),
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
    this.setState({
      date: new Date().toLocaleString()
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    let file = this.state.file;
    let userId = this.props.userEmail;
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
          ? this.setState({
            uploadBar: 'visible'
          })
          : this.setState({
            uploadBar: 'invisible'
          });
      }, (error) => {
        // Handle unsuccessful uploads
      }, () => {
        // Handle successful uploads on complete
        let scribeKey = base.database().ref('msgList/').push().key;
        let downloadURL = uploadTask.snapshot.downloadURL;
        let updates = {};
        let scribeData = {
          scribe: scribeText,
          scribeImage: downloadURL,
          datetime: datetime,
          userName: userName,
          userEmail: userEmail,
          userPhoto: userPhoto
        }
        updates['/msgList/' + scribeKey] = scribeData;
        base.database().ref().update(updates);
        this.setState({
          uploadBar: 'invisible'
        });
      });
    } else {
      if (chars_left >= 0) {
        let scribeKey = base.database().ref('msgList/').push().key;
        let updates = {};
        let scribeData = {
          scribe: scribeText,
          datetime: datetime,
          userName: userName,
          userEmail: userEmail,
          userPhoto: userPhoto
        }
        updates['/msgList/' + scribeKey] = scribeData;
        base.database().ref().update(updates);
      }
    }
    ReactDOM.findDOMNode(this.refs.scribe).value = '';
    const newState = !this.state.replied;
    this.setState({
      replied: newState,
      file: '',
      imagePreviewUrl: '',
      bodyText: ''
    });
    this.props.callbackParent(newState);
  }

  handleInput = (evt) => {
    this.setState({
      bodyText: evt.target.value
    });
  }

  handleImgUpload = (evt) => {
    evt.preventDefault();
    let reader = new FileReader();
    let file = evt.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }
    reader.readAsDataURL(file)
  }

  removeImgUpload = (evt) => {
    evt.preventDefault();
    ReactDOM.findDOMNode(this.refs.fileUpload).value = '';
    this.setState({
      file: '',
      imagePreviewUrl: ''
    });
  }

  handleCancel = (evt) => {
    const newState = !this.state.replied;
    this.setState({
      replied: newState
    });
    this.props.callbackParent(newState);
  }

  render() {
    let $imagePreview = null;
    let {imagePreviewUrl} = this.state;
    if (imagePreviewUrl) {
      $imagePreview = (
        <span>
          <a className="upload-image-remove delete" onClick={this.removeImgUpload}></a>
          <img src={imagePreviewUrl} className="image is-128x128 scribe-image-rounded" alt={this.state.file.name}/>
        </span>
      );
    } else {
      $imagePreview = null;
    }
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <article className="media flat-box">
          <div className="media-left">
            {(this.props.currentScribe.userPhoto === null)
        ? <i className="fa fa-user-circle-o fa-2x" aria-hidden="true"></i>
        : <figure className="image is-48x48">
                <img src={this.props.currentScribe.userPhoto} alt="profilePic" className="scribe-image-rounded"/>
              </figure>}
          </div>
          <div className="media-content">
            <div className="field">
              <p className="control">
                {$imagePreview}
                <textarea ref='scribe' defaultValue={this.state.bodyText} placeholder="What's happening?" className='textarea' onChange={this.handleInput.bind(this)} required/>
                <span className={`upload-bar ${this.state.uploadBar}`}>Sending Scribe now...</span>
              </p>
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
                  <button className="button is-info" type="submit" disabled={this.state.bodyText.length === 0}>
                    <span className="icon">
                      <i className="fa fa-pencil-square-o fa-fw" aria-hidden="true"/>
                    </span>
                    <span>Scribe</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="media-right">
            <a onClick={this.handleCancel.bind(this)}>
              <span className="icon is-small">
                <i className="fa fa-times" aria-hidden="true"></i>
              </span>
            </a>
          </div>
        </article>
      </form>
      );
  }
}

export default AddReply;
