import React from 'react';
import ReactDOM from 'react-dom';
import base from '../rebase.config';
import "./scribes.css";

const max_chars = 160;

class AddScribe extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      chars_left: max_chars,
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
    this.setState({date: new Date().toLocaleString()});
  }

  handleSubmit(e) {
    e.preventDefault();
    let file = this.state.file;
    let userId = this.props.userEmail;
    let scribeText = ReactDOM.findDOMNode(this.refs.scribe).value;
    let datetime = this.state.date;
    let userName = this.props.userName;
    let userEmail = this.props.userEmail;
    let userPhoto = this.props.userPhoto;
    let charCount = this.state.chars_used;

    if (file !== '' && this.state.chars_left >= 0) {
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
        let scribeKey = base.database().ref('msgList/').push().key;
        let downloadURL = uploadTask.snapshot.downloadURL;
        let updates = {};
        let scribeData = {
          scribe: scribeText,
          scribeImage: downloadURL,
          datetime: datetime,
          userName: userName,
          userEmail: userEmail,
          userPhoto: userPhoto,
          scribeCharCount: charCount
        }
        updates['/msgList/' + scribeKey] = scribeData;
        base.database().ref().update(updates);
        this.setState({uploadBar: 'invisible'});
      });
    } else {
      if (this.state.chars_left >= 0) {
        let scribeKey = base.database().ref('msgList/').push().key;
        let updates = {};
        let scribeData = {
          scribe: scribeText,
          datetime: datetime,
          userName: userName,
          userEmail: userEmail,
          userPhoto: userPhoto,
          scribeCharCount: charCount
        }
        updates['/msgList/' + scribeKey] = scribeData;
        base.database().ref().update(updates);
      }
    }

    ReactDOM.findDOMNode(this.refs.scribe).value = '';
    this.setState({chars_left: max_chars, file: '', imagePreviewUrl: ''});
  }

  handleCharacterCount() {
    let input_chars = this.refs.scribe.value.length;
    this.setState({
      chars_left: max_chars - input_chars,
						chars_used: input_chars
    });
  }

  handleImgUpload = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({file: file, imagePreviewUrl: reader.result});
    }
    reader.readAsDataURL(file)
  }

  removeImgUpload = (e) => {
    e.preventDefault();
    ReactDOM.findDOMNode(this.refs.fileUpload).value = '';
    this.setState({file: '', imagePreviewUrl: ''});
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
      <div>
        <form onSubmit={this.handleSubmit.bind(this)} className='box'>
          <article className="media">
            <div className="media-left">
              {(this.props.userPhoto === null)
                ? <i className="fa fa-user-circle-o fa-2x" aria-hidden="true"></i>
                : <figure className="image is-48x48">
                  <img src={this.props.userPhoto} alt="profilePic" className="scribe-image-rounded"/>
                </figure>}
            </div>
            <div className="media-content">
              <div className="field">
                <p className="control">
                  {$imagePreview}
                  <textarea ref='scribe' placeholder="What's happening?" className='textarea' onChange={this.handleCharacterCount.bind(this)} required/>
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
                    <div className="pr">{this.state.chars_left}</div>
                  </div>
                  <div className="column is-narrow">
                    <button className="button is-info" type="submit">
                      <span className="icon">
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
      </div>
    );
  }

}

export default AddScribe;
