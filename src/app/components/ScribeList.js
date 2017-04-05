import React from 'react';
import * as firebase from "firebase";
import AddScribe from './AddScribe';
import Scribe from './Scribe';
import logo from '../logo.svg';

class ScribeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scribes: [],
      starred: false
    };
  };

  componentDidMount() {
    firebase.database().ref('mainTL').on('value', (res) => {
      const userData = res.val();
      const dataArray = [];
      for (let objKey in userData) {
        userData[objKey].key = objKey;
        dataArray.push(userData[objKey])
      }
      this.setState({scribes: dataArray})
    })
  };

  deleteScribe(item, evt) {
    evt.stopPropagation();
    let userId = this.props.userId;
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
    let userId = this.props.userId;
    let mainDbRef = firebase.database().ref('mainTL/').child(item.key).child('likes');
    let userDbRef = firebase.database().ref('userTL/' + userId + '/').child(item.key).child('likes');
    (this.state.starred === true)
      ? this.decrementAndSave(mainDbRef, userDbRef)
      : this.incrementAndSave(mainDbRef, userDbRef)
  }

  render() {
    let scribes = this.state.scribes.map((item) => {
      return (<Scribe thread={item} removeScribe={this.deleteScribe.bind(this, item)} favScribe={this.toggleLikes.bind(this, item)} key={item.key}/>);
    })
    return (
      <div className="scribe-container">
        <div className="columns pt-1">
          <div className="column is-3">
            <div className="profile-card is-hidden-mobile">
              <div className="card-content">
                <div className="media">
                  <div className="media-left">
                    {this.props.hasOwnProperty("userPhoto")
                      ? <figure className="image is-48x48">
                          <img src={this.props.thread.userPhoto} alt="profilePic" className="image-rounded"/>
                        </figure>
                      : <figure className="image is-48x48">
                        <img src={logo} alt="defaultProfilePic" className="image-rounded"/>
                      </figure>}
                  </div>
                  <div className="media-content">
                    <p className="title is-5 pr">{this.props.userName}</p>
                    <p className="subtitle is-6 lh-1">{this.props.userEmail}</p>
                  </div>
                </div>
                <footer className="leveled">
                  <div className="has-text-left">
                    <div className="pr-1">
                      <p className="subtitle-text-is-2 lh-1">Manuscripts</p>
                      <p className="title-text text-is-primary">{this.state.scribes.length}</p>
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
          <div className="column">
            <AddScribe mainTL={this.state.scribes} userName={this.props.userName} userId={this.props.userId} userEmail={this.props.userEmail} userPhoto={this.props.userPhoto}/>
            <ul className="">{scribes}</ul>
          </div>
          <div className="column is-2">
            <div className="follow-card is-hidden-mobile">
              <h3 className="text-title-is-5">Who to Follow:</h3>
              <article className="">
                <div className="pt-1">
                  <div className="leveled">
                    <span className="icon">
                      <i className="fa fa-user-circle-o" aria-hidden="true"></i>
                    </span>
                    <span className="text-title-is-2 py">Placeholder</span>
                    <a className="button is-info is-outlined is-small">
                      <span className="icon">
                        <i className="fa fa-user-plus"></i>
                      </span>
                    </a>
                  </div>
                </div>
              </article>
              <article className="">
                <div className="pt-1">
                  <div className="leveled">
                    <span className="icon">
                      <i className="fa fa-user-circle-o" aria-hidden="true"></i>
                    </span>
                    <span className="text-title-is-2 py">Placeholder</span>
                    <a className="button is-info is-outlined is-small">
                      <span className="icon">
                        <i className="fa fa-user-plus"></i>
                      </span>
                    </a>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ScribeList;
