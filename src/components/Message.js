import React from 'react';

class Message extends React.Component {
	render() {
		return (
     <li className="bg-info">
						<button onClick={ this.props.removeMessage.bind(null) } className='btn btn-danger'> X</button>
						<p>{ this.props.thread.title }</p>
						<p>{ this.props.thread.message }</p>
     </li>
		);
	}

}

export default Message;
