import React from 'react';
import * as firebase from 'firebase';
import "./layout.css";
import './icon-colors.css';

class ForgotPassword extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			resetUser: this.props.initialState,
			emailText: '',
			emailErr: 'invisible',
			emailValid: false,
			submitErr: ''
		};
	} //end constructor

	handleForgotPassword = (evt) => {
		evt.preventDefault();
		let email = this.state.emailText;
		firebase.auth().sendPasswordResetEmail(email).catch(err => {
			this.setState({submitErr: err.message});
		});
	} //end handleForgotPassword

	handleEmailInput = (evt) => {
		this.setState({emailText: evt.target.value});
		let emailInput = this.state.emailText;
		(/[\w\-._]+@[\w\-._]+\.\w{2,10}/.test(emailInput))
			? this.setState({emailErr: 'invisible', emailValid: true, submitErr: ''})
			: this.setState({emailErr: 'visible', emailValid: false});
		//end email validation
	} //end handleEmailInput

	handleCancel = (evt) => {
		const newState = !this.state.resetUser;
		this.props.callbackParent(newState);
	} //end handleCancel

	renderEmail() {
		if (this.state.emailErr === 'visible' && this.state.emailValid === false) {
			return (
				<div className="field">
					<label className="label is-small">Email Address</label>
					<p className="control has-icons-left has-icons-right icon-danger">
						<input className="input is-danger" value={this.state.emailText} type="email" title="Please enter your email address" placeholder="your@email" onChange={this.handleEmailInput.bind(this)} required/>
						<span className="icon is-small is-left">
							<i className="fa fa-envelope"></i>
						</span>
						<span className="icon is-small is-right">
							<i className="fa fa-warning"></i>
						</span>
					</p>
					<span className="help is-danger">Please enter a valid Email Address</span>
				</div>
			);
		} else if (this.state.emailErr === 'invisible' && this.state.emailValid === true) {
			return (
				<div className="field">
					<label className="label is-small">Email Address</label>
					<p className="control has-icons-left has-icons-right icon-success">
						<input className="input is-success" value={this.state.emailText} type="email" title="Please enter your email address" placeholder="your@email" onChange={this.handleEmailInput.bind(this)} required/>
						<span className="icon is-small is-left">
							<i className="fa fa-envelope"></i>
						</span>
						<span className="icon is-small is-right">
							<i className="fa fa-check"></i>
						</span>
					</p>
					{(this.state.submitErr === '')
						? null
						: <span className="help is-danger">{this.state.submitErr}</span>}
				</div>
			);
		} else if (this.state.emailErr === 'invisible' && this.state.emailValid === false) {
			return (
				<div className="field">
					<label className="label is-small">Email Address</label>
					<p className="control has-icons-left icon-default">
						<input className="input" value={this.state.emailText} type="email" title="Please enter your email address" placeholder="your@email" onChange={this.handleEmailInput.bind(this)} required/>
						<span className="icon is-small is-left">
							<i className="fa fa-envelope"></i>
						</span>
					</p>
				</div>
			);
		} // email if/else
	} //end renderEmail

	render() {
		return (
			<div className="">
				<div className="login-container is-overlay">
					<div className="signIn-card">
						<header className="">
							<h3 className="title has-text-centered">Forgot Password?</h3>
						</header>
						<form onSubmit={this.handleForgotPassword.bind(this)}>
							{this.renderEmail()}
							<div className="field is-group">
								<p className="control">
									<input type="submit" className="button is-success" value="Request Password Reset" disabled={!this.state.emailValid}/>
								</p>
								<p className="control">
									<button onClick={this.handleCancel} className="button is-link">Cancel</button>
								</p>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	} // end render
}

export default ForgotPassword;
