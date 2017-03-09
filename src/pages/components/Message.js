import React from 'react';

class Message extends React.Component {
	render() {
		return (
			<div className="box">
				<div className="media">
					<div className="media-left">
						<figure className="image is-64x64">
							<img src="http://placehold.it/128x128" alt="profile" />
						</figure>
					</div>
					<div className="media-content">
						<div class="content">
							<p>
								<strong>DisplayName</strong><small>@email</small><small>time</small>
								<br />
								{this.props.thread.message}
							</p>
							<div className="level">
								<div class="level-left">
									<a className="level-item">
										<span class="icon"><i className="fa fa-reply" aria-hidden="true" ></i></span>
									</a>
									<a className="level-item" type="button">
										<span class="icon"><i className="fa fa-retweet" aria-hidden="true" ></i></span>
									</a>
									<a className="level-item" type="button">
										<span class="icon"><i className="fa fa-star" aria-hidden="true" ></i></span>
									</a>
									<a onClick={this.props.removeMessage.bind(null)} className='level-item'>
										<span class="icon"><i className="fa fa-times" aria-hidden="true" ></i></span>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

}

export default Message;
