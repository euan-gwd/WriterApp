import React from 'react';
import * as firebase from "firebase";
import Reply from './Reply';

class ReplyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      replies: [],
      scribeKey: this.props.currentScribe.key,
      starred: false
    };
  };

  componentDidMount() {
    const keyRef = this.state.scribeKey;
    // this.ref = firebase.bindToState('mainTL/' + keyRef + '/scribeReplies/', {
    //   context: this,
    //   state: 'replies',
    //   asArray: true
    // })
    firebase.database().ref('mainTL/' + keyRef + '/scribeReplies/').on('value', (res) => {
      const userData = res.val();
      console.log(userData);
      const dataArray = [];
      for (let objKey in userData) {
        userData[objKey].key = objKey;
        dataArray.push(userData[objKey])
      }
      this.setState({replies: dataArray})
    })
  };

  // componentWillUnmount() {
  //   firebase.removeBinding(this.ref);
  // }

  deleteReply(itm, evt) {
    evt.stopPropagation();
    const keyRef = this.state.scribeKey;
    let userId = this.props.currentScribe.userId;
    let mainTLRef = firebase.database().ref('mainTL/' + keyRef + '/scribeReplies/');
    let userTLRef = firebase.database().ref('userTL/' + userId + '/' + keyRef + '/scribeReplies/');

    if (itm.hasOwnProperty("replyImage")) {
      let deleteImgRef = firebase.storage().refFromURL(itm.replyImage);
      if (window.confirm("Do you really want to delete this?")) {
        mainTLRef.child(itm.key).remove(); //removes item from firefirebase RTdfirebase
        userTLRef.child(itm.key).remove(); //removes item from firefirebase RTdfirebase
        deleteImgRef.delete(); //removes item from storageBucket
      }
    } else {
      if (window.confirm("Do you really want to delete this?")) {
        mainTLRef.child(itm.key).remove(); //removes item from firefirebase RTdfirebase
        userTLRef.child(itm.key).remove(); //removes item from firefirebase RTdfirebase
      }
    }
  }

  incrementAndSave(mainTLDbRef, userTLDbRef) {
    mainTLDbRef.transaction(star => star + 1);
    userTLDbRef.transaction(star => star + 1);
    this.setState({starred: true});
  }

  decrementAndSave(mainTLDbRef, userTLDbRef) {
    mainTLDbRef.transaction(star => star - 1);
    userTLDbRef.transaction(star => star - 1);
    this.setState({starred: false});
  }

  toggleLikes(item, evt) {
    evt.stopPropagation();
    const keyRef = this.state.scribeKey;
    let userId = this.props.currentScribe.userId;
    let mainTLDbRef = firebase.database().ref('mainTL/' + keyRef + '/scribeReplies/').child(item.key).child('likes');
    let userTLDbRef = firebase.database().ref('userTL/' + userId + '/' + keyRef + '/scribeReplies/').child(item.key).child('likes');
    (this.state.starred === true)
      ? this.decrementAndSave(mainTLDbRef, userTLDbRef)
      : this.incrementAndSave(mainTLDbRef, userTLDbRef)
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
