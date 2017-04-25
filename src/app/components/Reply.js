import React from 'react';
import moment from 'moment';
import * as firebase from "firebase";
import EditReply from './EditReply';
import AddNestedReply from './AddNestedReply';
import defaultUserPic from '../Default_User_Pic.svg';
import "./layout.css";
import './icon-colors.css';

class Reply extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			edited: false,
			replied: false
		}
	}

	handleEditBtnClick() {
		this.setState({edited: true})
	}

	onReplyEdited(newState) {
		this.setState({edited: newState})
	}

	handleReplyBtnClick() {
		this.setState({replied: true})
	}

	onScribeReply(newState) {
		this.setState({replied: newState})
	}

	render() {
		let currentUser = firebase.auth().currentUser.displayName;
		let showLikesTotal = (this.props.stream.starCount > 0)
			? <span className="icon is-small liked">
					<i className="fa fa-star" aria-hidden="true">
						<span className="pl">{this.props.stream.starCount}</span>
					</i>
				</span>
			: <span className="icon is-small">
				<i className="fa fa-star" aria-hidden="true"></i>
			</span>;
		//end showLikesTotal

		return (
			<div>
				{this.props.stream.hasOwnProperty("reported")
					? null
					: <article className="media">
						<div className="media-left">
							{this.props.stream.hasOwnProperty("userPhoto")
								? <figure className="image is-48x48">
										<img src={this.props.stream.userPhoto} alt="profilePic" className="image-rounded"/>
									</figure>
								: <figure className="image is-48x48">
									<img src={defaultUserPic} alt="defaultProfilePic" className="image-rounded"/>
								</figure>}
						</div>
						<div className="media-content">
							<div className="content">
								<div>
									<span className="title is-5 pr">{this.props.stream.userName}</span>
									<span className="subtitle is-6 pr">{this.props.stream.userEmail}</span>
									<span className="subtitle is-7 has-text-right">{moment(this.props.stream.datetime).fromNow()}</span>
								</div>
								<div>
									{this.props.stream.scribe}
									{this.props.stream.hasOwnProperty("scribeImage")
										? <div className="media-content px">
												<figure>
													<img src={this.props.stream.scribeImage} alt="scribeImage" className="image-rounded image"/>
												</figure>
											</div>
										: null}
								</div>
								<div className="scribe-actions-leveled-nested">
									<a className="reply" onClick={this.handleReplyBtnClick.bind(this)} data-balloon="Reply" data-balloon-pos="up">
										<span className="icon is-small">
											<i className="fa fa-reply" aria-hidden="true"></i>
										</span>
									</a>
									<a className="star" onClick={this.props.favReply.bind(null)} data-balloon="Favourite" data-balloon-pos="up">
										{showLikesTotal}
									</a>
									{(currentUser === this.props.stream.userName)
										? <a className="edit" onClick={this.handleEditBtnClick.bind(this)} data-balloon="Edit" data-balloon-pos="up">
												<span className="icon is-small">
													<i className="fa fa-pencil" aria-hidden="true"></i>
												</span>
											</a>
										: null}
									<a className="flag" data-balloon="Report" data-balloon-pos="up" onClick={this.props.reportReply.bind(null)}>
										<span className="icon is-small">
											<i className="fa fa-flag" aria-hidden="true"></i>
										</span>
									</a>
									{(currentUser === this.props.stream.userName)
										? <a onClick={this.props.removeReply.bind(null)} className="remove" data-balloon="delete" data-balloon-pos="up">
												<span className="icon is-small">
													<i className="fa fa-times" aria-hidden="true"></i>
												</span>
											</a>
										: null}
								</div>
							</div>
							{this.state.edited
								? <EditReply currentReply={this.props.stream} parentId={this.props.parentId} initialState={this.state.edited} callbackParent={(newState) => this.onReplyEdited(newState)}/>
								: null}
							{this.state.replied
								? <AddNestedReply currentScribe={this.props.stream} parentId={this.props.parentId} initialState={this.state.replied} callbackParent={(newState) => this.onScribeReply(newState)}/>
								: null}
						</div>
					</article>}
			</div>
		);
	}
}

export default Reply;
