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

  componentDidMount() {
    this.ref = base.listenTo('msgList', {
      context: this,
      asArray: true,
      then(data) {
        this.setState({
          loading: false,
          scribes: data
        })
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
    if (item.hasOwnProperty("scribeImage")) {
      let deleteImgRef = base.storage().refFromURL(imgRef);
      if (window.confirm("Do you really want to delete this?")) {
        msgListRef.child(itemId).remove(); //removes item from firebase RTdBase
        deleteImgRef.delete(); //removes item from storageBucket
      }
    } else {
      if (window.confirm("Do you really want to delete this?")) {
        msgListRef.child(itemId).remove(); //removes item from firebase RTdBase
      }
    }
  }

  render() {
    let scribes = this.state.scribes.map((item) => {
      return (<Scribe thread={item} removeScribe={this.deleteScribe.bind(this, item)} key={item.key}/>);
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
                      <p className="title is-5">{this.props.userName}</p>
                      <p className="subtitle is-6">{this.props.userEmail}</p>
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
              <div className="card is-hidden-mobile">
                <h3 className="title is-5">Who to Follow:</h3>
                <article className="media followList">
                  <div className="media-left">
                    <i className="fa fa-user-circle-o fa-2x" aria-hidden="true"></i>
                  </div>
                  <div className="media-content">
                    <div className="content">
                      <span className="subtitle is-6">Placeholder</span>
                    </div>
                  </div>
                  <div className="media-right">
                    <a className="button is-info is-outlined is-small">
                      <span className="icon">
                        <i className="fa fa-user-plus"></i>
                      </span>
                    </a>
                  </div>
                </article>
                <article className="media followList">
                  <div className="media-left">
                    <i className="fa fa-user-circle-o fa-2x" aria-hidden="true"></i>
                  </div>
                  <div className="media-content">
                    <div className="content">
                      <span className="subtitle is-6">Placeholder</span>
                    </div>
                  </div>
                  <div className="media-right">
                    <a className="button is-info is-outlined is-small">
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
