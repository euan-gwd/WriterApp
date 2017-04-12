import React from 'react';
import * as firebase from "firebase";
import AddScribe from './AddScribe';
import Scribe from './Scribe';
import defaultUserPic from '../Default_User_Pic.svg';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scribes: [],
      starred: false,
      userId: null,
      userName: null,
      userEmail: null,
      userPhoto: null
    };
  };

  componentDidMount() {
    let user = firebase.auth().currentUser;
    if (user != null) {
      this.setState({
        userId: user.uid,
        userName: user.displayName,
        userEmail: user.email,
        userPhoto: user.photoURL
      })
    }
    
    firebase.database().ref('mainTL').on('value', (res) => {
      const scribeData = res.val();
      const scribeDataArray = [];
      for (let objKey in scribeData) {
        scribeData[objKey].key = objKey;
        scribeDataArray.push(scribeData[objKey])
      }
      this.setState({ scribes: scribeDataArray })
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
    this.setState({ starred: true });
  }

  decrementAndSave(mainDbRef, userDbRef) {
    mainDbRef.transaction(star => star - 1);
    userDbRef.transaction(star => star - 1);
    this.setState({ starred: false });
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
    let scribes = this.state.scribes.map((item) => {
      return (<Scribe thread={item} removeScribe={this.deleteScribe.bind(this, item)} favScribe={this.toggleLikes.bind(this, item)} key={item.key} />);
    })
    return (
      <div className="scribe-container">
        <div className="columns pt-1">
          <div className="column is-3">
            <div className="profile-card is-hidden-mobile">
              <div className="card-image">
                <figure className="image">
                  <img src="http://lorempixel.com/288/100/" alt="CardImage" className="image-top-borders-rounded" />
                </figure>
              </div>
              <div className="card-content">
                <div className="media">
                  <div className="media-left">
                    {(this.state.userPhoto === null)
                      ? <figure className="image is-48x48 is-border-image">
                        <img src={defaultUserPic} alt="defaultProfilePic" className="image-rounded" />
                      </figure>
                      : <figure className="image is-48x48 is-border-image">
                        <img src={this.state.userPhoto} alt="profilePic" className="image-rounded" />
                      </figure>}
                  </div>
                  <div className="media-content">
                    <p className="title is-5 pr">{this.state.userName}</p>
                    <p className="subtitle is-6 lh-1">{this.state.userEmail}</p>
                  </div>
                </div>
                <footer className="leveled">
                  <div className="has-text-left">
                    <div className="pr-1">
                      <p className="subtitle-text-is-2 lh-1">Manuscripts</p>
                      <p className="text-is-primary">{this.state.scribes.length}</p>
                    </div>
                  </div>
                  <div className="has-text-left">
                    <div className="">
                      <p className="subtitle-text-is-2 lh-1">Following</p>
                      <p className="text-is-primary">123</p>
                    </div>
                  </div>
                  <div className="has-text-left">
                    <div className="pl-1">
                      <p className="subtitle-text-is-2 lh-1">Followers</p>
                      <p className="text-is-primary">456K</p>
                    </div>
                  </div>
                </footer>
              </div>
            </div>
          </div>
          <div className="column is-7">
            <AddScribe mainTL={this.state.scribes} userName={this.state.userName} userId={this.state.userId} userEmail={this.state.userEmail} userPhoto={this.state.userPhoto} />
            <ul className="">{scribes}</ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
