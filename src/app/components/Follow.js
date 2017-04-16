import React from 'react';
import * as firebase from 'firebase';
import "./layout.css";
import './colors.css';

class Follow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.UserID,
      userName: null,
      userPhoto: null
    };
  };

  componentDidMount() {
    let userId = this.props.UserID;
    firebase.database().ref('users/' + userId + '/').once('value', (res) => {
      const followerData = res.val();
      const {name, photoUrl} = followerData;
      this.setState({userName: name, userPhoto: photoUrl});
    });
  }

  render() {
    return (
      <div className="selected-scribe mb">
        <div className="media">
          <div className="media-left">
            <figure className="image is-32x32">
              <img src={this.state.userPhoto} alt="profilePic" className="image-rounded"/>
            </figure>
          </div>
          <div className="media-content">
            <p className="subtitle is-6">{this.state.userName}</p>
          </div>
          <div className="media-right">
            <a className="follow" data-balloon="Follow Writer" data-balloon-pos="left">
              <span className="icon is-medium">
                <i className="fa fa-user-plus" aria-hidden="true"></i>
              </span>
            </a>
          </div>
        </div>
      </div>
    );
  }

}

export default Follow;
