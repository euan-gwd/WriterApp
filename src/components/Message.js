import React from 'react';

const Message = () => (
	<li onClick={ this.props.handleClick.bind(null) } className={ this.props.show ? 'bg-warning' : 'bg-info'}>
		<button onClick={ this.props.removeMessage.bind(null) } className='btn btn-danger'>
			X
		</button>
		{ this.props.thread.title }
		{ this.props.show && <p> { this.props.thread.message } </p> }
	</li>
);

export default Message;
