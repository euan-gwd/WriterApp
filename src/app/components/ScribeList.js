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
      return (<Scribe thread={item} removeScribe={this.deleteScribe.bind(this, item)} key={item.key} />);
    })

    return (
      <div className="centered-main">
        {this.state.loading === true
          ? <div className="centered">
              <span className="icon">
                <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
                <span className="sr-only">Loading...</span>
              </span>
            </div>
          : <div className="">
            <AddScribe msgList={this.state.scribes} userName={this.props.userName} userEmail={this.props.userEmail} userPhoto={this.props.userPhoto} className=""/>
            <ul className="">{scribes}</ul>
          </div>}
      </div>
    );
  }
}

export default ScribeList;
