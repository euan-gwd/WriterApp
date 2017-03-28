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

  componentWillMount() {
    const keyRef = this.state.scribeKey;
    this.ref = base.listenTo('mainTL/' + keyRef + '/scribeReplies/', {
      context: this,
      asArray: true,
      then(data) {
        this.setState({replies: data})
      }
    })
  };

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  deleteReply(itm, evt) {
    evt.stopPropagation();
    const keyRef = this.state.scribeKey;
    let mainTLRef = base.database().ref('mainTL/' + keyRef + '/scribeReplies/');
    let itemId = itm.key;
    let imgRef = itm.replyImage;
    if (itm.hasOwnProperty("replyImage")) {
      let deleteImgRef = base.storage().refFromURL(imgRef);
      if (window.confirm("Do you really want to delete this?")) {
        mainTLRef.child(itemId).remove(); //removes item from firebase RTdBase
        deleteImgRef.delete(); //removes item from storageBucket
      }
    } else {
      if (window.confirm("Do you really want to delete this?")) {
        mainTLRef.child(itemId).remove(); //removes item from firebase RTdBase
      }
    }
  }

  render() {
    const keyRef = this.state.scribeKey;
    let replies = this.state.replies.map((itm, index) => {
      return (<Reply stream={itm} parentId={keyRef} removeReply={this.deleteReply.bind(this, itm)} key={itm.key}/>);
    })
    return (
      <article className="Media">
        <ul className="">{replies}</ul>
      </article>
    );
  }
}

export default ReplyList;
