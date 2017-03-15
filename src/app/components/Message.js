import React from 'react';
import placeholdImg from '../assets/128x128.png';
import './messages.css';

class Message extends React.Component {

	render() {
		return (
			<div className="messages-list">
				<div className="box">
					<div className="media">
						<div className="media-left">
							<figure className="image is-48x48">
								<img src={placeholdImg} alt="profile" />
							</figure>
						</div>
						<div className="media-content">
							<div className="content">
								<p>
									<strong>{this.props.thread.userName}</strong> <small>{this.props.thread.userEmail}</small> - <small>{this.props.thread.datetime}</small>
									<br />
									{this.props.thread.message}
								</p>
							</div>
							{this.props.thread.hasOwnProperty("messageImage") ?
								<div className="media-content">
									<div className="content">
										<img src={this.props.thread.messageImage} alt="messageImage" className="image"/>
									</div>
								</div> : null}
							<nav className="level">
								<div className="level-left">
									<a className="level-item">
										<span className="icon"><i className="fa fa-reply" aria-hidden="true" ></i></span>
									</a>
									<a className="level-item" type="button">
										<span className="icon"><i className="fa fa-pencil" aria-hidden="true" ></i></span>
									</a>
									<a onClick={this.props.removeMessage.bind(null)} className='level-item'>
										<span className="icon"><i className="fa fa-times" aria-hidden="true" ></i></span>
									</a>
								</div>
							</nav>
						</div>
					</div>
				</div>
			</div>
		);
	}

}

export default Message;
