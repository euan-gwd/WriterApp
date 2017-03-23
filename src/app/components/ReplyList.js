import React from 'react';
import base from '../rebase.config';
import Reply from './Reply';

class ReplyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      replies: [],
						scribeKey: this.props.currentScribe.key
    };
  }
  ;

  componentDidMount() {
    let keyRef = this.state.scribeKey;
    this.ref = base.bindToState('msgList/' + keyRef + '/', {
      context: this,
      state: 'replies',
      asArray: true
    })
  }
  ;

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  deleteReply(replyItem, evt) {
    evt.stopPropagation();
    let msgListRef = base.database().ref('msgList/');
    let itemId = replyItem.key;
    let imgRef = replyItem.replyImage;
    let replyUID = replyItem.userName;
    let currentUID = this.props.userName;
    if (replyItem.hasOwnProperty("replyImage")) {
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
    let replies = this.state.replies.map((replyItem) => {
      return (<Reply thread={replyItem} removeReply={this.deleteReply.bind(this, replyItem)} key={replyItem.key}/>);
    })
    return (
      <article className="Media">
            <ul className="">{replies}</ul>
      </article>
      );
  }
}

export default ReplyList;
