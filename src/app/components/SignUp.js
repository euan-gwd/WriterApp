import React from 'react';
import * as firebase from 'firebase';
import "./layout.css";
import './icon-colors.css';

class SignUp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			nameText: '',
			emailText: '',
			passText: '',
			nameErr: 'invisible',
			emailErr: 'invisible',
			passErr: 'invisible',
			nameValid: false,
			emailValid: false,
			passValid: false
		};
	} //end constructor

	handleUserSignUp = (evt) => {
		evt.preventDefault();
		let name = this.state.nameText;
		let email = this.state.emailText;
		let pass = this.state.passText;

		firebase.auth().createUserWithEmailAndPassword(email, pass).then(res => {
			let newUserKey = res.uid;
			let updates = {};
			let userData = {
				displayName: name,
				email: res.email,
				photoUrl: '',
				followingCount: 0,
				followerCount: 0,
				bannerPhotoUrl: ''
			}
			updates['/users/' + newUserKey] = userData;
			firebase.database().ref().update(updates);
			firebase.auth().currentUser.updateProfile({displayName: name}).then(() => {}, (err) => {
				console.log(err)
			});
		}).catch(err => {
			console.log(err);
		});
	} //end handleUserSignUp

	handleNameInput = (evt) => {
		this.setState({nameText: evt.target.value});
		let nameInput = this.state.nameText;
		(/^[A-Z][a-zA-Z-_ ]{2,30}$/.test(nameInput))
			? this.setState({nameErr: 'invisible', nameValid: true})
			: this.setState({nameErr: 'visible', nameValid: false});
		//end name validation
	} //end handleNameInput

	handleEmailInput = (evt) => {
		this.setState({emailText: evt.target.value});
		let emailInput = this.state.emailText;
		(/[\w\-._]+@[\w\-._]+\.\w{2,10}/.test(emailInput))
			? this.setState({emailErr: 'invisible', emailValid: true})
			: this.setState({emailErr: 'visible', emailValid: false});
		//end email validation
	} //end handleEmailInput

	handlePassInput = (evt) => {
		this.setState({passText: evt.target.value});
		const passPattern = new RegExp(/^[a-zA-Z0-9@$#|!]{7,30}$/);
		let password = this.state.passText;
		switch (passPattern.test(password)) {
			case false:
				this.setState({passErr: 'visible', passValid: false});
				break;
			case true:
				return this.setState({passErr: 'invisible', passValid: true});
			default:
				break;
		} //end password validation
	} //end handlePassInput

	renderName() {
		if (this.state.nameErr === 'visible' && this.state.nameValid === false) {
			return (
				<div className="visible">
					<div className="field">
						<label className="label is-small">UserName</label>
						<p className="control has-icons-left has-icons-right icon-danger">
							<input className="input is-danger" value={this.state.nameText} placeholder="Your Name" title="Minimum 3 characters, First Letter Uppercase." onChange={this.handleNameInput.bind(this)} required autoComplete="username" autoFocus/>
							<span className="icon is-small is-left">
								<i className="fa fa-user"></i>
							</span>
							<span className="icon is-small is-right">
								<i className="fa fa-warning"></i>
							</span>
						</p>
						<span className="help is-danger">Minimum 3 characters, First Letter uppercase</span>
					</div>
				</div>
			);
		} else if (this.state.nameErr === 'invisible' && this.state.nameValid === true) {
			return (
				<div className="field">
					<label className="label is-small">UserName</label>
					<p className="control has-icons-left has-icons-right icon-success">
						<input className="input is-success" value={this.state.nameText} placeholder="Your Name" title="Minimum 3 characters, First Letter Uppercase." onChange={this.handleNameInput.bind(this)} required autoComplete="username" autoFocus/>
						<span className="icon is-small is-left">
							<i className="fa fa-user"></i>
						</span>
						<span className="icon is-small is-right">
							<i className="fa fa-check"></i>
						</span>
					</p>
				</div>
			);
		} else if (this.state.nameErr === 'invisible' && this.state.nameValid === false) {
			return (
				<div className="field">
					<label className="label is-small">UserName</label>
					<p className="control has-icons-left icon-default">
						<input className="input" value={this.state.nameText} placeholder="Your Name" title="Minimum 3 characters, First Letter Uppercase." onChange={this.handleNameInput.bind(this)} required autoComplete="username" autoFocus/>
						<span className="icon is-small is-left">
							<i className="fa fa-user"></i>
						</span>
					</p>
				</div>
			);
		} // name if/else
	} //end renderName

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

	renderPass() {
		if (this.state.passErr === 'invisible' && this.state.passValid === false) {
			return (
				<div className="field">
					<label className="label is-small">Password</label>
					<p className="control has-icons-left icon-default">
						<input className="input" value={this.state.passText} type="password" title="Password must contain Minimum 8 characters, Recommend least 1 Uppercase Alphabet, 1 Lowercase Alphabet, 1 Number and 1 Special Character." placeholder="******" onChange={this.handlePassInput.bind(this)} required/>
						<span className="icon is-small is-left">
							<i className="fa fa-key"></i>
						</span>
					</p>
				</div>
			);
		} else if (this.state.passErr === 'visible' && this.state.passValid === false) {
			return (
				<div className="field">
					<label className="label is-small">Password</label>
					<p className="control has-icons-left has-icons-right icon-danger">
						<input className="input is-danger" value={this.state.passText} type="password" title="Password must contain Minimum 8 characters, Recommend least 1 Uppercase Alphabet, 1 Lowercase Alphabet, 1 Number and 1 Special Character." placeholder="******" onChange={this.handlePassInput.bind(this)} required/>
						<span className="icon is-small is-left">
							<i className="fa fa-key"></i>
						</span>
						<span className="icon is-small is-right">
							<i className="fa fa-warning"></i>
						</span>
					</p>
					<span className="help is-danger">Too Short, Password must contain Minimum 8 characters.</span>
				</div>
			);
		} else if (this.state.passErr === 'invisible' && this.state.passValid === true) {
			return (
				<div className="field">
					<label className="label is-small">Password</label>
					<p className="control has-icons-left has-icons-right icon-success">
						<input className="input is-success" value={this.state.passText} type="password" title="Password must contain Minimum 8 characters, Recommend least 1 Uppercase Alphabet, 1 Lowercase Alphabet, 1 Number and 1 Special Character." placeholder="******" onChange={this.handlePassInput.bind(this)} required/>
						<span className="icon is-small is-left">
							<i className="fa fa-key"></i>
						</span>
						<span className="icon is-small is-right">
							<i className="fa fa-check"></i>
						</span>
					</p>
				</div>
			);
		} // password if/else
	} //end renderPass

	render() {
		return (
			<div className="">
				<div className="login-container is-overlay">
					<div className="signIn-card">
						<header className="">
							<h3 className="title has-text-centered">Sign Up</h3>
						</header>
						<form onSubmit={this.handleUserSignUp.bind(this)}>
							{this.renderName()}
							{this.renderEmail()}
							{this.renderPass()}
							<div className="field is-group">
								<p className="control">
									<input type="submit" className="button is-success" value="Create Account" disabled={!this.state.nameValid && !this.state.emailValid && !this.state.passValid}/>
								</p>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	} // end render
}

export default SignUp;
