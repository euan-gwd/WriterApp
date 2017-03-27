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
                    <span className="icon is-small">
                      <i className="fa fa-times" aria-hidden="true"></i>
                    </span>
                  </a>
                : null}
              <div>
                <span className="title is-5 pr">{this.props.thread.userName}</span>
                <span className="subtitle is-6">{this.props.thread.userEmail}</span>
              </div>
              <div>
                {this.props.thread.scribe}
                {this.props.thread.hasOwnProperty("scribeImage")
                  ? <div className="media-content px-1">
                      <img src={this.props.thread.scribeImage} alt="scribeImage" className="image image-rounded"/>
                    </div>
                  : <div className="px-1"></div>}
              </div>
              <div className="">
                <a className="pr-1" onClick={this.handleReplyBtnClick.bind(this)}>
                  <i className="fa fa-reply fa-fw" aria-hidden="true"></i>
                </a>
                {(currentUser === this.props.thread.userName)
                  ? <a className="pr-1" onClick={this.handleEditBtnClick.bind(this)}>
                      <i className="fa fa-pencil fa-fw" aria-hidden="true"></i>
                    </a>
                  : null}
                <small className="has-text-right">{moment(this.props.thread.datetime).fromNow()}</small>
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
