import React from 'react';
import Rebase from 're-base';
import AddMessage from './AddMessage';
import Message from './Message';

const base = Rebase.createClass({apiKey: "AIzaSyA7rSLgtDXwdc_nj4fmwYuTilQN19a4ytY", authDomain: "react-chat-app-f64bb.firebaseapp.com", databaseURL: "https://react-chat-app-f64bb.firebaseio.com", storageBucket: "react-chat-app-f64bb.appspot.com", messagingSenderId: "962792118288"});

class MessageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      loading: true
    };
  };

  componentDidMount() {
    this.ref = base.syncState('msgList', {
      context: this,
      state: 'messages',
      asArray: true,
      then() {
        this.setState({loading: false})
      }
    })
  };

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  deleteMessage(index, item, e) {
    e.stopPropagation();
    let msgListRef = base.database().ref('msgList/');
    let itemId = item.key;
    let imgRef = item.messageImage;
    let messageUID = item.userName;
    if (item.hasOwnProperty(imgRef)) {
      let deleteImgRef = base.storage().refFromURL(imgRef);
      let currentUID = this.props.userName;
      if (messageUID === currentUID) {
        deleteImgRef.delete(); //removes item from storageBucket
        msgListRef.child(itemId).remove(); //removes item from firebase RTdBase
      }
    } else {
      let currentUID = this.props.userName;
      if (messageUID === currentUID) {
        msgListRef.child(itemId).remove(); //removes item from firebase RTdBase
      }
    }

    // let arr = this.state.messages.concat([]);
    // let messageUID = arr[index].userName;
    // let imgRef = arr[index].messageImage;
    // if (arr[index].hasOwnProperty(imgRef)) {
    //   let deleteImgRef = base.storage().refFromURL(imgRef);
    //   let currentUID = this.props.userName;
    //   if (messageUID === currentUID) {
    //     arr.splice(index, 1);
    //     this.setState({messages: arr})
    //     deleteImgRef.delete();
    //   }
    // } else {
    //   let currentUID = this.props.userName;
    //   if (messageUID === currentUID) {
    //     arr.splice(index, 1);
    //     this.setState({messages: arr})
    //   }
    // }
  }

  render() {
    let messages = this.state.messages.map((item, index) => {
      return (<Message thread={item} removeMessage={this.deleteMessage.bind(this, index, item)} key={item.key}/>);
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
          : <div className="panel">
            <AddMessage msgList={this.state.messages} userName={this.props.userName} userEmail={this.props.userEmail} userPhoto={this.props.userPhoto} className="panel-block"/>
            <ul className="">{messages}</ul>
          </div>}
      </div>
    );
  }
}

export default MessageList;
