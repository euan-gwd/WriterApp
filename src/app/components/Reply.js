import React from 'react';
import EditReply from './EditReply';
import './scribes.css';

class Reply extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edited: false,
    }
  }

  handleEditBtnClick() {
    this.setState({edited: true})
  }

  onReplyEdited(newState) {
    this.setState({edited: newState})
  }
  render() {
    return (
      <div className="">
        <article className="media">
          <div className="media-left">
            {this.props.stream.hasOwnProperty("userPhoto")
              ? <figure className="image is-48x48">
                  <img src={this.props.stream.userPhoto} alt="profilePic" className="scribe-image-rounded"/>
                </figure>
              : <i className="fa fa-user-circle-o fa-2x" aria-hidden="true"></i>}
          </div>
          <div className="media-content">
            <div className="content">
              <a onClick={this.props.removeReply.bind(null)} className="is-pulled-right">
                <span className="icon is-small">
                  <i className="fa fa-times" aria-hidden="true"></i>
                </span>
              </a>
              <div>
                <span className="title is-5 pr">{this.props.stream.userName}</span>
                <span className="subtitle is-6">{this.props.stream.userEmail}</span>
              </div>
              <div>
                {this.props.stream.scribe}
                {this.props.stream.hasOwnProperty("scribeImage")
                  ? <div className="media-content px-1">
                      <img src={this.props.stream.scribeImage} alt="scribeImage" className="image scribe-image-rounded"/>
                    </div>
                  : <div className="px-1"></div>}
              </div>
              <div className="">
                <a className="pr-1" onClick={this.handleEditBtnClick.bind(this)}>
                  <i className="fa fa-pencil fa-fw" aria-hidden="true"></i>
                </a>
                <small className="has-text-right">{this.props.stream.datetime}</small>
              </div>
            </div>
            {this.state.edited
              ? <EditReply currentReply={this.props.stream} parentId={this.props.parentId} initialState={this.state.edited} callbackParent={(newState) => this.onReplyEdited(newState)}/>
              : null}
          </div>
        </article>
      </div>
    );
  }
}

export default Reply;
