import React from 'react';
import moment from 'moment';
import base from '../rebase.config';
import EditScribe from './EditScribe';
import AddReply from './AddReply';
import ReplyList from './ReplyList';
import './scribes.css';

class Scribe extends React.Component {
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

  onScribeEdited(newState) {
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
    let showLikesTotal = (this.props.thread.likes > 0)
      ? <span className="pl">{this.props.thread.likes}</span>
      : null;
    let repliesTotal = (this.props.thread.hasOwnProperty("scribeReplies"))
      ? Object.keys(this.props.thread.scribeReplies).length
      : 0;
    let showRepliesTotal = (repliesTotal > 0)
      ? <span className="pl">{repliesTotal}</span>
      : null;
    return (
      <li className="selected-scribe card">
        <article className="media">
          <div className="media-left">
            {this.props.thread.hasOwnProperty("userPhoto")
              ? <figure className="image is-48x48">
                  <img src={this.props.thread.userPhoto} alt="profilePic" className="image-rounded"/>
                </figure>
              : <i className="fa fa-user-circle-o fa-2x" aria-hidden="true"></i>}
          </div>
          <div className="media-content">
            <div className="content">
              {(currentUser === this.props.thread.userName)
                ? <a onClick={this.props.removeScribe.bind(null)} className="is-pulled-right">
                    <span className="icon">
                      <i className="fa fa-times" aria-hidden="true"></i>
                    </span>
                  </a>
                : null}
              <div>
                <span className="title-text-is-3 pr">{this.props.thread.userName}</span>
                <span className="subtitle-text-is-2">{this.props.thread.userEmail}</span>
              </div>
              <div>
                {this.props.thread.scribe}
                {this.props.thread.hasOwnProperty("scribeImage")
                  ? <div className="media-content px">
                      <figure className="">
                        <img src={this.props.thread.scribeImage} alt="scribeImage" className="image-rounded image"/>
                      </figure>
                    </div>
                  : null}
              </div>
              <div className="leveled-nested">
                <a className="" onClick={this.handleReplyBtnClick.bind(this)}>
                  <span className="icon">
                    <i className="fa fa-reply fa-fw" aria-hidden="true">
                      {showRepliesTotal}
                    </i>
                  </span>
                </a>
                <a className="" onClick={this.props.favScribe.bind(null)}>
                  <span className="icon">
                    <i className="fa fa-star fa-fw" aria-hidden="true">
                      {showLikesTotal}
                    </i>
                  </span>
                </a>
                {(currentUser === this.props.thread.userName)
                  ? <a className="" onClick={this.handleEditBtnClick.bind(this)}>
                      <span className="icon">
                        <i className="fa fa-pencil fa-fw" aria-hidden="true"></i>
                      </span>
                    </a>
                  : null}
                <p className="has-text-right">{moment(this.props.thread.datetime).fromNow()}</p>
              </div>
            </div>
            {this.state.edited
              ? <EditScribe currentScribe={this.props.thread} initialState={this.state.edited} callbackParent={(newState) => this.onScribeEdited(newState)}/>
              : null}
            {this.state.replied
              ? <AddReply currentScribe={this.props.thread} initialState={this.state.replied} callbackParent={(newState) => this.onScribeReply(newState)}/>
              : <ReplyList currentScribe={this.props.thread}/>}
          </div>
        </article>
      </li>
    );
  }
}

export default Scribe;
