import React from 'react';
import ReactDOM from 'react-dom';
// import base from '../rebase.config';
import base from '../firebase.config';
import "./scribes.css";

class EditScribe extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      edited: this.props.initialState,
      scribeText: this.props.currentScribe.scribe,
      date: new Date().toISOString()
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
    let scribeText = this.state.scribeText;
    let scribeKeyRef = this.props.currentScribe.key;
    let userId = this.props.currentScribe.userId;
    let chars_left = 160 - this.state.scribeText.length;
    let scribeData = {
      scribe: scribeText
    }
    if (chars_left >= 0) {
      base.database().ref('/mainTL/' + scribeKeyRef).update(scribeData);
      base.database().ref('/userTL/' + userId + '/' + scribeKeyRef).update(scribeData);
    }
    ReactDOM.findDOMNode(this.refs.scribe).value = '';
    const newState = !this.state.edited;
    this.props.callbackParent(newState);
  }

  handleInput = (evt) => {
    this.setState({scribeText: evt.target.value})
  }

  handleCancel = (evt) => {
    const newState = !this.state.edited;
    this.setState({edited: newState});
    this.props.callbackParent(newState);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <article className="media flat-box">
          <div className="media-left">
            {(this.props.currentScribe.userPhoto === null)
              ? <i className="fa fa-user-circle-o fa-2x" aria-hidden="true"></i>
              : <figure className="image is-48x48">
                <img src={this.props.currentScribe.userPhoto} alt="profilePic" className="image-rounded"/>
              </figure>}
          </div>
          <div className="media-content">
            <div className="field">
              <p className="control">
                <textarea ref='scribe' defaultValue={this.state.scribeText} className='textarea' onChange={this.handleInput.bind(this)} required/>
                <span className="help is-primary has-text-centered" id="uploadBar" ref="uploadNotif">Updating scribe now...</span>
              </p>
            </div>
            <div className="pt">
              <div className="columns is-mobile is-gapless">
                <div className="column has-text-right char-count">
                  <div className="pr">{160 - this.state.scribeText.length}</div>
                </div>
                <div className="column is-narrow">
                  <button className="button is-primary" type="submit" disabled={this.state.scribeText.length === 0}>
                    <span className="icon">
                      <i className="fa fa-pencil-square-o fa-fw" aria-hidden="true"/>
                    </span>
                    <span>Update</span>
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

export default EditScribe;
