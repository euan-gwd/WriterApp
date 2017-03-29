import React from 'react';
import base from '../rebase.config';
import AddScribe from './AddScribe';
import Scribe from './Scribe';

class ScribeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scribes: [],
      loading: true
    };
  }
  ;

  componentWillMount() {
    this.ref = base.listenTo('mainTL', {
      context: this,
      asArray: true,
      then(data) {
        this.setState({
          loading: false,
          scribes: data
        })
      }
    })
  }
  ;

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  deleteScribe(item, evt) {
    evt.stopPropagation();
    let userId = this.props.userId;
    let mainTLRef = base.database().ref('mainTL/');
    let userTLRef = base.database().ref('userTL/' + userId + '/');
    if (item.hasOwnProperty("scribeImage")) {
      let deleteImgRef = base.storage().refFromURL(item.scribeImage);
      if (window.confirm("Do you really want to delete this?")) {
        mainTLRef.child(item.key).remove(); //removes item from firebase RTdBase
        userTLRef.child(item.key).remove(); //removes item from firebase RTdBase
        deleteImgRef.delete(); //removes item from storageBucket
      }
    } else {
      if (window.confirm("Do you really want to delete this?")) {
        mainTLRef.child(item.key).remove(); //removes item from firebase RTdBase
        userTLRef.child(item.key).remove(); //removes item from firebase RTdBase
      }
    }
  }

  toggleLikes(item, evt) {
    evt.stopPropagation();
    let userId = this.props.userId;
    let mainDbRef = base.database().ref('mainTL/').child(item.key).child('likes');
    let userDbRef = base.database().ref('userTL/' + userId + '/').child(item.key).child('likes');
    mainDbRef.transaction(fav => fav + 1);
    userDbRef.transaction(fav => fav + 1);
  }

  render() {
    let scribes = this.state.scribes.map((item) => {
      return (<Scribe thread={item} removeScribe={this.deleteScribe.bind(this, item)} favScribe={this.toggleLikes.bind(this, item)} key={item.key}/>);
    })
    return (
      <div className="scribe-container">
        {this.state.loading === true
        ? <div className="centered">
              <span>Fetching Scribes...</span>
              <span className="icon">
                <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
              </span>
            </div>
        : <div className="columns pt-1">
            <div className="column is-3">
              <div className="profile-card is-hidden-mobile">
                <div className="card-content">
                  <div className="media">
                    <div className="media-left">
                      {this.props.hasOwnProperty("userPhoto")
          ? <figure className="image is-48x48">
                            <img src={this.props.userPhoto} alt="profilePic" className="image-rounded"/>
                          </figure>
          : <span className="icon">
                          <i className="fa fa-user-circle-o fa-2x" aria-hidden="true"></i>
                        </span>}
                    </div>
                    <div className="media-content">
                      <p className="title-text-is-3">{this.props.userName}</p>
                      <p className="subtitle-text-is-2 lh-1">{this.props.userEmail}</p>
                    </div>
                  </div>
                  <footer className="leveled">
                    <div className="has-text-centered">
                      <div className="pt">
                        <p className="subtitle-text lh-1">Manuscripts</p>
                        <p className="text-is-primary">{this.state.scribes.length}</p>
                      </div>
                    </div>
                    <div className="has-text-centered">
                      <div className="pt">
                        <p className="subtitle-text lh-1">Following</p>
                        <p className="text-is-primary">123</p>
                      </div>
                    </div>
                    <div className="has-text-centered">
                      <div className="pt">
                        <p className="subtitle-text lh-1">Followers</p>
                        <p className="text-is-primary">456K</p>
                      </div>
                    </div>
                  </footer>
                </div>
              </div>
            </div>
            <div className="column">
              <AddScribe mainTL={this.state.scribes} userName={this.props.userName} userId={this.props.userId} userEmail={this.props.userEmail} userPhoto={this.props.userPhoto} className=""/>
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
          </div>}
      </div>
      );
  }
}

export default ScribeList;
