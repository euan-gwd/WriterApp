import React from 'react';
import * as firebase from "firebase";
import UserScribe from './UserScribe';
import "./layout.css";
import './colors.css';

class UserScribeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userScribe: [],
      starred: false,
      // userId: null,
      // userName: null,
      // userEmail: null,
      // userPhoto: null
    };
  };

  componentDidMount() {
    let user = firebase.auth().currentUser;
    if (user !== null) {
      this.setState({userId: user.uid, userName: user.displayName, userEmail: user.email, userPhoto: user.photoURL})
    }

    const keyRef = user.uid;
    firebase.database().ref('userTL/' + keyRef + '/').on('value', (res) => {
      const userScribeData = res.val();
      const userScribeDataArray = [];
      for (let objKey in userScribeData) {
        userScribeData[objKey].key = objKey;
        userScribeDataArray.push(userScribeData[objKey])
      }
      this.setState({userScribe: userScribeDataArray})
    });
  };

  deleteScribe(item, evt) {
    evt.stopPropagation();
    let userId = this.state.userId;
    let mainTLRef = firebase.database().ref('mainTL/');
    let userTLRef = firebase.database().ref('userTL/' + userId + '/');
    if (item.hasOwnProperty("scribeImage")) {
      let deleteImgRef = firebase.storage().refFromURL(item.scribeImage);
      if (window.confirm("Do you really want to delete this?")) {
        mainTLRef.child(item.key).remove(); //removes item from firefirebase RTdfirebase
        userTLRef.child(item.key).remove(); //removes item from firefirebase RTdfirebase
        deleteImgRef.delete(); //removes item from storageBucket
      }
    } else {
      if (window.confirm("Do you really want to delete this?")) {
        mainTLRef.child(item.key).remove(); //removes item from firefirebase RTdfirebase
        userTLRef.child(item.key).remove(); //removes item from firefirebase RTdfirebase
      }
    }
  }

  incrementAndSave(mainDbRef, userDbRef) {
    mainDbRef.transaction(star => star + 1);
    userDbRef.transaction(star => star + 1);
    this.setState({starred: true});
  }

  decrementAndSave(mainDbRef, userDbRef) {
    mainDbRef.transaction(star => star - 1);
    userDbRef.transaction(star => star - 1);
    this.setState({starred: false});
  }

  toggleLikes(item, evt) {
    evt.stopPropagation();
    let userId = this.state.userId;
    let mainDbRef = firebase.database().ref('mainTL/').child(item.key).child('likes');
    let userDbRef = firebase.database().ref('userTL/' + userId + '/').child(item.key).child('likes');
    (this.state.starred === true)
      ? this.decrementAndSave(mainDbRef, userDbRef)
      : this.incrementAndSave(mainDbRef, userDbRef)
  }

  render() {
    let userScribe = this.state.userScribe.map((item) => {
      return (<UserScribe thread={item} removeScribe={this.deleteScribe.bind(this, item)} favScribe={this.toggleLikes.bind(this, item)} key={item.key}/>);
    })
    return (
      <div className="scribe-container">
        <div className="columns pt-1">
          <div className="column is-half is-offset-one-quarter">
            <ul id="userScribeList">{userScribe}</ul>
          </div>
        </div>
      </div>
    );
  }
}

export default UserScribeList;
