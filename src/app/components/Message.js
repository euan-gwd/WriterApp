import React from 'react';
import './messages.css';

class Message extends React.Component {
  render() {
    return (
      <div className="panel-block">
        <div className="media">
          <div className="media-left">
            {this.props.thread.hasOwnProperty("userPhoto")
              ? <figure className="image is-48x48">
                  <img src={this.props.thread.userPhoto} alt="profilePic" className="message-image-rounded"/>
                </figure>
              : <i className="fa fa-user-circle-o fa-2x" aria-hidden="true"></i>}
          </div>
          <div className="media-content">
            <div className="content">
              <p>
                <span className="title is-5 pr-1">{this.props.thread.userName}</span>
                <span className="subtitle is-6">{this.props.thread.userEmail}</span>
              </p>
              {this.props.thread.message}
            </div>
            {this.props.thread.hasOwnProperty("messageImage")
              ? <div className="media-content">
                  <img src={this.props.thread.messageImage} alt="messageImage" className="image message-image-rounded"/>
                </div>
              : <div></div>}
            <small>{this.props.thread.datetime}</small>
          </div>
          <div className="media-right">
            <a onClick={this.props.removeMessage.bind(null)}>
              <span className="icon is-small">
                <i className="fa fa-times" aria-hidden="true"></i>
              </span>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Message;
