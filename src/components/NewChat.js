import React from 'react';
import ReactDOM from 'react-dom';
import Rebase from 're-base';

const base = Rebase.createClass({
  apiKey: "AIzaSyDYliJuBFjLAQO_vfH0rlioWUiKrRe_ZL4",
  authDomain: "tchatapp-586ab.firebaseapp.com",
  databaseURL: "https://tchatapp-586ab.firebaseio.com",
  storageBucket: "tchatapp-586ab.appspot.com",
  messagingSenderId: "846810590536"
});

class NewChat extends React.Component {

	_newChat(e) {
	  e.preventDefault();
			base.post('chats', {
				data: this.props.chats.concat([{
        title: ReactDOM.findDOMNode(this.refs.title).value,
        message: ReactDOM.findDOMNode(this.refs.message).value
      }]),
				context: this,
				then: () => {
        console.log('POSTED');
      }
			});
			ReactDOM.findDOMNode(this.refs.message).value = '';
   ReactDOM.findDOMNode(this.refs.title).value = '';
	}

	render() {
		return (
			<div className='col-md-12'>
				<form onSubmit={ this._newChat.bind(this) } className='form-group col-md-8'>
					<input ref='title' type='text' placeholder='Title' className='form-control' />
					<textarea ref='message'  placeholder='Message' className='form-control' />
					<input type='submit' className='btn btn-success' />
				</form>
			</div>
		);
	}

}

export default NewChat;
