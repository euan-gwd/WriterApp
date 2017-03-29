import React from 'react';
import moment from 'moment';
import base from '../rebase.config';
import EditReply from './EditReply';
import AddNestedReply from './AddNestedReply';
import './scribes.css';

class Reply extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edited: false,
      replied: false
    }
  }

  handleEditBtnClick() {
    this.setState({edited: true})
  }

  onReplyEdited(newState) {
    this.setState({edited: newState})
  }

  handleReplyBtnClick() {
    this.setState({replied: true})
  }

  onScribeReply(newState) {
    this.setState({replied: newState})
  }

  render() {
    let currentUser = base.auth().currentUser.displayName;
    let showLikesTotal = (this.props.stream.likes !== 0)
      ? <span className="pl">{this.props.stream.likes}</span>
      : null;
    return (
      <div className="">
        <article className="media">
          <div className="media-left">
            {this.props.stream.hasOwnProperty("userPhoto")
              ? <figure className="image is-48x48">
                  <img src={this.props.stream.userPhoto} alt="profilePic" className="image-rounded"/>
                </figure>
              : <i className="fa fa-user-circle-o fa-2x" aria-hidden="true"></i>}
          </div>
          <div className="media-content">
            <div className="content">
              {(currentUser === this.props.stream.userName)
                ? <a onClick={this.props.removeReply.bind(null)} className="is-pulled-right">
                    <span className="icon">
                      <i className="fa fa-times" aria-hidden="true"></i>
                    </span>
                  </a>
                : null}
              <div>
                <span className="title is-5 pr">{this.props.stream.userName}</span>
                <span className="subtitle is-6">{this.props.stream.userEmail}</span>
              </div>
              <div>
                {this.props.stream.scribe}
                {this.props.stream.hasOwnProperty("scribeImage")
                  ? <div className="media-content">
                      <img src={this.props.stream.scribeImage} alt="scribeImage" className="image image-rounded"/>
                    </div>
                  : <div className=""></div>}
              </div>
              <div className="leveled-nested">
                <a className="pr-1" onClick={this.handleReplyBtnClick.bind(this)}>
                  <span className="icon">
                    <i className="fa fa-reply fa-fw" aria-hidden="true">
                    </i>
                  </span>
                </a>
                <a className="pr-1" onClick={this.props.favReply.bind(null)}>
                  <span className="icon">
                    <i className="fa fa-star fa-fw" aria-hidden="true">
                      {showLikesTotal}
                    </i>
                  </span>
                </a>
                {(currentUser === this.props.stream.userName)
                  ? <a className="pr-1" onClick={this.handleEditBtnClick.bind(this)}>
                      <span className="icon">
                        <i className="fa fa-pencil fa-fw" aria-hidden="true"></i>
                      </span>
                    </a>
                  : null}
                <p className="has-text-right">{moment(this.props.stream.datetime).fromNow()}</p>
              </div>
            </div>
            {this.state.edited
              ? <EditReply currentReply={this.props.stream} parentId={this.props.parentId} initialState={this.state.edited} callbackParent={(newState) => this.onReplyEdited(newState)}/>
              : null}
            {this.state.replied
              ? <AddNestedReply currentScribe={this.props.stream} parentId={this.props.parentId} initialState={this.state.replied} callbackParent={(newState) => this.onScribeReply(newState)}/>
              : null}
          </div>
        </article>
      </div>
    );
  }
}

export default Reply;
