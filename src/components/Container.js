import React from 'react';
import Rebase from 're-base';
import Message from './Messages';

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
				messages : [],
				show: null
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
				messages: arr,
				show: null
			})
		}

		_toggleView(index) {
			this.setState({
				show: index
			});
		};

			render() {
				let messages = this.state.message.map((item, index) => {
					return (
						<Message thread={item} show={ this.state.show === index} removeMessage={this._removeMessage.bind(this, index)} handleClick={this._toggleView.bind(this.index)} key={index}/>
					);
				});

				return (
					<div className="col-md-12">
						<div className="col-md-8">
							<h1>{ (this.state.messages.length || 0) + ' messages' }</h1>
							<ul>{ messages }</ul>
						</div>
					</div>
				);
			}
}

export default Container;
