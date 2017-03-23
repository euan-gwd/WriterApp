import React from 'react';
import base from '../rebase.config';
import Reply from './Reply';

class ReplyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      replies: []
    };
  }
  ;

  componentDidMount() {
    let scribeKey = this.props.currentScribe.key;
    this.ref = base.bindToState('msgList/' + scribeKey + '/', {
      context: this,
      state: 'replies',
      asArray: true
    })
  }
  ;

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  deleteReply(item, evt) {
    evt.stopPropagation();
    let msgListRef = base.database().ref('msgList/');
    let itemId = item.key;
    let imgRef = item.replyImage;
    let replyUID = item.userName;
    let currentUID = this.props.userName;
    if (item.hasOwnProperty("replyImage")) {
      let deleteImgRef = base.storage().refFromURL(imgRef);
      if (replyUID === currentUID) {
        msgListRef.child(itemId).remove(); //removes item from firebase RTdBase
        deleteImgRef.delete(); //removes item from storageBucket
      }
    } else {
      if (replyUID === currentUID) {
        msgListRef.child(itemId).remove(); //removes item from firebase RTdBase
      }
    }
  }

  render() {
    let replies = this.state.replies.map((item) => {
      return (<Reply thread={item} removeReply={this.deleteReply.bind(this, item)} key={item.key}/>);
    })
    return (
      <article className="Media">
            <ul className="">{replies}</ul>
      </article>
      );
  }
}

export default ReplyList;
