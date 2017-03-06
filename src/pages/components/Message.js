import React from 'react';

class Message extends React.Component {
	render() {
		return (
     <div className="container">
						<div className="media comment-backplate">
							<i className="d-flex align-self-start mr-3 rounded fa fa-user-circle fa-2x" />
							<div className="media-body">
								<strong className="mt-0">{ this.props.thread.title }</strong>
								<hr/>
								<p>{ this.props.thread.message }</p>
								<img src="http://placehold.it/350x150" alt="payload" className="media-body-image" />
								<div className="d-flex flex-row">
									<button className="btn btn-link" type="button">
										<i className="fa fa-reply" aria-hidden="true" >Reply</i>
									</button>
									<button className="btn btn-link" type="button">
										<i className="fa fa-retweet" aria-hidden="true" >Retweet</i>
									</button>
									<button className="btn btn-link" type="button">
										<i className="fa fa-star" aria-hidden="true" >Favorite</i>
									</button>
									<button onClick={ this.props.removeMessage.bind(null) } className='btn btn-link'>
										<i className="fa fa-times" aria-hidden="true" >Delete</i>
									</button>
								</div>
							</div>
						</div>
					</div>
		);
	}

}

export default Message;
