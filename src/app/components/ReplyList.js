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
  };

  componentDidMount() {
    const keyRef = this.state.scribeKey;
    this.ref = base.bindToState('mainTL/' + keyRef + '/scribeReplies/', {
      context: this,
			state: 'replies',
      asArray: true
    })
  };

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  deleteReply(itm, evt) {
    evt.stopPropagation();
    const keyRef = this.state.scribeKey;
    let userId = this.props.currentScribe.userId;
    let mainTLRef = base.database().ref('mainTL/' + keyRef + '/scribeReplies/');
    let userTLRef = base.database().ref('userTL/' + userId + '/' + keyRef + '/scribeReplies/');

    if (itm.hasOwnProperty("replyImage")) {
      let deleteImgRef = base.storage().refFromURL(itm.replyImage);
      if (window.confirm("Do you really want to delete this?")) {
        mainTLRef.child(itm.key).remove(); //removes item from firebase RTdBase
        userTLRef.child(itm.key).remove(); //removes item from firebase RTdBase
        deleteImgRef.delete(); //removes item from storageBucket
      }
    } else {
      if (window.confirm("Do you really want to delete this?")) {
        mainTLRef.child(itm.key).remove(); //removes item from firebase RTdBase
        userTLRef.child(itm.key).remove(); //removes item from firebase RTdBase
      }
    }
  }

  toggleLikes(item, evt) {
    evt.stopPropagation();
    const keyRef = this.state.scribeKey;
    let userId = this.props.currentScribe.userId;
    let mainTLDbRef = base.database().ref('mainTL/' + keyRef + '/scribeReplies/').child(item.key).child('likes');
    let userTLDbRef = base.database().ref('userTL/' + userId + '/' + keyRef + '/scribeReplies/').child(item.key).child('likes');
    mainTLDbRef.transaction(fav => fav + 1);
    userTLDbRef.transaction(fav => fav + 1);
  }

  render() {
    const keyRef = this.state.scribeKey;
    let replies = this.state.replies.map((itm, index) => {
      return (<Reply stream={itm} parentId={keyRef} removeReply={this.deleteReply.bind(this, itm)} favReply={this.toggleLikes.bind(this, itm)} key={itm.key}/>);
    })
    return (
      <div>
        {replies}
      </div>
    );
  }
}

export default ReplyList;
