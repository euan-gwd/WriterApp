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
  };

  componentDidMount() {
    this.ref = base.bindToState('msgList', {
      context: this,
      state: 'scribes',
      asArray: true,
      then() {
        this.setState({loading: false})
      }
    })
  };

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  deleteScribe(item, evt) {
    evt.stopPropagation();
    let msgListRef = base.database().ref('msgList/');
    let itemId = item.key;
    let imgRef = item.scribeImage;
    let scribeUID = item.userName;
    let currentUID = this.props.userName;
    if (item.hasOwnProperty("scribeImage")) {
      let deleteImgRef = base.storage().refFromURL(imgRef);
      if (scribeUID === currentUID) {
        msgListRef.child(itemId).remove(); //removes item from firebase RTdBase
        deleteImgRef.delete(); //removes item from storageBucket
      }
    } else {
      if (scribeUID === currentUID) {
        msgListRef.child(itemId).remove(); //removes item from firebase RTdBase
      }
    }
  }

  render() {
    let scribes = this.state.scribes.map((item) => {
      return (<Scribe thread={item} removeScribe={this.deleteScribe.bind(this, item)} key={item.key}/>);
    })
    return (
      <div className="container is-fluid">
        {this.state.loading === true
          ? <div className="centered">
              <span>Fetching Scribes...</span>
              <span className="icon">
                <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
              </span>
            </div>
          : <div className="columns pt-1">
            <div className="column is-3">
              <div className="profile-card">
                <div className="card-content">
                  <div className="media">
                    <div className="media-left">
                      <figure className="image is-48x48">
                        <img src={this.props.userPhoto} alt="ProfileImg" className="image-rounded"/></figure>
                    </div>
                    <div className="media-content">
                      <p className="">{this.props.userName}</p>
                      <p className="">{this.props.userEmail}</p>
                    </div>
                  </div>
                  <footer className="card-footer">
                    <div className="card-footer-item has-text-centered">
                      <div>
                        <p className="">Manuscripts</p>
                        <p className="text-is-primary">{this.state.scribes.length}</p>
                      </div>
                    </div>
                    <div className="card-footer-item has-text-centered">
                      <div>
                        <p className="">Following</p>
                        <p className="text-is-primary">123</p>
                      </div>
                    </div>
                    <div className="card-footer-item has-text-centered">
                      <div>
                        <p className="">Followers</p>
                        <p className="text-is-primary">456K</p>
                      </div>
                    </div>
                  </footer>
                </div>
              </div>
            </div>
            <div className="column">
              <AddScribe msgList={this.state.scribes} userName={this.props.userName} userEmail={this.props.userEmail} userPhoto={this.props.userPhoto} className=""/>
              <ul className="">{scribes}</ul>
            </div>
            <div className="column is-2">
              <div className="card">
                <h3 className="title is-5">Who to Follow:</h3>
                <article className="media">
                  <div className="media-left">
                    <i className="fa fa-user-circle-o fa-2x" aria-hidden="true"></i>
                  </div>
                  <div className="media-content">
                    <div className="content">Placeholder User</div>
                  </div>
                  <div className="media-right">
                    <a className="button is-primary is-outlined is-small">
                      <span className="icon">
                        <i className="fa fa-user-plus"></i>
                      </span>
                    </a>
                  </div>
                </article>
                <article className="media">
                  <div className="media-left">
                    <i className="fa fa-user-circle-o fa-2x" aria-hidden="true"></i>
                  </div>
                  <div className="media-content">
                    <div className="content">Placeholder User</div>
                  </div>
                  <div className="media-right">
                    <a className="button is-primary is-outlined is-small">
                      <span className="icon">
                        <i className="fa fa-user-plus"></i>
                      </span>
                    </a>
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
