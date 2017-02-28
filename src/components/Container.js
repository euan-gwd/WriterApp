import React from 'react';
import Rebase from 're-base';
import Message from './Message';

const base = Rebase.createClass({
  apiKey: "AIzaSyDYliJuBFjLAQO_vfH0rlioWUiKrRe_ZL4",
  authDomain: "tchatapp-586ab.firebaseapp.com",
  databaseURL: "https://tchatapp-586ab.firebaseio.com",
  storageBucket: "tchatapp-586ab.appspot.com",
  messagingSenderId: "846810590536"
});

class Container extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				messages : []
			};
		};

		componentWillMount() {
			this.ref = base.syncState('chats', {
				context: this,
				state: 'messages',
				asArray: true
			})
		};

		componentWillUnmount() {
			base.removeBinding(this.ref);
		}

		_removeMessage(index,e) {
			e.stopPropagation();
			let arr = this.state.messages.concat([]);
			arr.splice(index,1);

			this.setState({
				messages: arr
			})
		}

			render() {
				let messages = this.state.messages.map((item, index) => {
					return (
						<Message thread={item} removeMessage={this._removeMessage.bind(this, index)} key={index} className="comment-backing"/>
					);
				})

				return (
					<div className="col-8 mx-auto">
						<h1 className="text-center mt-3">{ (this.state.messages.length || 0) + ' messages' }</h1>
						<ul>{ messages }</ul>
					</div>
				);
			}
}

export default Container;
