import React from 'react';
// import * as firebase from 'firebase';
import "./layout.css";
import './icon-colors.css';

class SignUp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			signUpUser: this.props.initialState,
			nameText: '',
			emailText: '',
			passText: '',
			passVerifyText: '',
			nameErr: 'invisible',
			emailErr: 'invisible',
			passErr: 'invisible',
			passVerifyErr: 'invisible',
			passMatchErr: 'invisible',
			nameValid: false,
			emailValid: false,
			passValid: false,
			passVerifyValid: false,
			passMatchValid: false
		};
	}

	handleUserSignUp = (evt) => {
		evt.preventDefault();
		let name = this.state.nameText;
		let email = this.state.emailText;
		let pass = this.state.passText;

		if (this.state.nameValid && this.state.emailValid && this.state.passValid && this.state.passVerifyValid && this.state.passMatchValid) {
			console.log(name, email, pass);
			// let newUserKey = firebase.database().ref('users/').push().key;
			// let updates = {};
			// let userData = {
			//   displayName: name,
			// 		email: email,
			//   photoUrl: null,
			// 		followingCount: 0,
			// 		followerCount: 0,
			// 		bannerPhotoUrl: null
			// }
			// updates['/users/' + newUserKey] = userData;
			// firebase.database().ref().update(updates);
			// firebase.auth().createUserWithEmailAndPassword(email, pass).catch(err => {
			//   console.log(err);
			// });
		}

	} //end handleUserSignUp

	handleCancel = (evt) => {
		const newState = !this.state.signUpUser;
		this.props.callbackParent(newState);
	} //end handleCancel

	handleNameInput = (evt) => {
		this.setState({nameText: evt.target.value});
		let name = this.state.nameText;
		(/^[A-Z][a-zA-Z-_ ]{2,30}$/gm.test(name))
			? this.setState({nameErr: 'invisible', nameValid: true})
			: this.setState({nameErr: 'visible', nameValid: false});
		//end name validation

	} //end handleNameInput

	handleEmailInput = (evt) => {
		this.setState({emailText: evt.target.value});
		let email = this.state.emailText;
		(/[\w\-._]+@[\w\-._]+\.\w{2,10}/.test(email))
			? this.setState({emailErr: 'invisible', emailValid: true})
			: this.setState({emailErr: 'visible', emailValid: false});
		//end email validation

	} //end handleEmailInput

	handlePassInput = (evt) => {
		this.setState({passText: evt.target.value});
		let pass = this.state.passText;
		(/(?=^.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/.test(pass))
			? this.setState({passErr: 'invisible', passValid: true})
			: this.setState({passErr: 'visible', passValid: false});
		//end password validation

	} //end handlePassInput

	handleVerifyPassInput = (evt) => {
		this.setState({passVerifyText: evt.target.value});
		let pass = this.state.passText;
		let verifyPass = this.state.passVerifyText;
		(/(?=^.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/.test(verifyPass))
			? this.setState({passVerifyErr: 'invisible', passVerifyValid: true})
			: this.setState({passVerifyErr: 'visible', passVerifyValid: false});
		(verifyPass === pass)
			? this.setState({passMatchErr: 'visible', passMatchValid: false})
			: this.setState({passMatchErr: 'invisible', passMatchValid: true});
		//end verify password validation

	} //end handleVerifyPassInput

	renderName() {
		if (this.state.nameErr === 'visible' && this.state.nameValid === false) {
			return (
				<div className="visible">
					<div className="field">
						<label className="label is-small">UserName</label>
						<p className="control has-icons-left has-icons-right icon-danger">
							<input className="input is-danger" defaultValue={this.state.nameText} placeholder="Your Name" onChange={this.handleNameInput.bind(this)} required/>
							<span className="icon is-small is-left">
								<i className="fa fa-user"></i>
							</span>
							<span className="icon is-small is-right">
								<i className="fa fa-warning"></i>
							</span>
						</p>
						<span className="help is-danger">Please enter a valid name longer than 3 chars, first letter must be Uppercase.</span>
					</div>
				</div>
			);
		} else if (this.state.nameErr === 'invisible' && this.state.nameValid === true) {
			return (
				<div className="field">
					<label className="label is-small">UserName</label>
					<p className="control has-icons-left has-icons-right icon-success">
						<input className="input is-success" defaultValue={this.state.nameText} placeholder="Your Name" onChange={this.handleNameInput.bind(this)} required/>
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
						<input className="input" defaultValue={this.state.nameText} placeholder="Your Name" onChange={this.handleNameInput.bind(this)} required/>
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
						<input className="input is-danger" defaultValue={this.state.emailText} type="email" placeholder="your@email" onChange={this.handleEmailInput.bind(this)} required/>
						<span className="icon is-small is-left">
							<i className="fa fa-envelope"></i>
						</span>
						<span className="icon is-small is-right">
							<i className="fa fa-warning"></i>
						</span>
					</p>
					<span className="help is-danger">Please enter a valid email address</span>
				</div>
			);
		} else if (this.state.emailErr === 'invisible' && this.state.emailValid === true) {
			return (
				<div className="field">
					<label className="label is-small">Email Address</label>
					<p className="control has-icons-left has-icons-right icon-success">
						<input className="input is-success" defaultValue={this.state.emailText} type="email" placeholder="your@email" onChange={this.handleEmailInput.bind(this)} required/>
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
						<input className="input" defaultValue={this.state.emailText} type="email" placeholder="your@email" onChange={this.handleEmailInput.bind(this)} required/>
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
						<input className="input" defaultValue={this.state.passText} type="password" placeholder="******" onChange={this.handlePassInput.bind(this)} required/>
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
						<input className="input is-danger" defaultValue={this.state.passText} type="password" placeholder="******" onChange={this.handlePassInput.bind(this)} required/>
						<span className="icon is-small is-left">
							<i className="fa fa-key"></i>
						</span>
						<span className="icon is-small is-right">
							<i className="fa fa-warning"></i>
						</span>
					</p>
					<span className="help is-danger">Please enter a valid password longer than 4 chars.</span>
				</div>
			);
		} else if (this.state.passErr === 'invisible' && this.state.passValid === true) {
			return (
				<div className="field">
					<label className="label is-small">Password</label>
					<p className="control has-icons-left has-icons-right icon-success">
						<input className="input is-success" defaultValue={this.state.passText} type="password" placeholder="******" onChange={this.handlePassInput.bind(this)} required/>
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

	renderPassVerify() {
		if (this.state.passVerifyErr === 'invisible' && this.state.passVerifyValid === false) {
			return (
				<div className="field">
					<label className="label is-small">Verify Password</label>
					<p className="control has-icons-left icon-default">
						<input className="input" defaultValue={this.state.passVerifyText} type="password" placeholder="******" onChange={this.handleVerifyPassInput.bind(this)} required/>
						<span className="icon is-small is-left">
							<i className="fa fa-key"></i>
						</span>
					</p>
				</div>
			);
		} else if (this.state.passVerifyErr === 'visible' && this.state.passVerifyValid === false) {
			return (
				<div className="field">
					<label className="label is-small">Verify Password</label>
					<p className="control has-icons-left has-icons-right icon-danger">
						<input className="input is-danger" defaultValue={this.state.passVerifyText} type="password" placeholder="******" onChange={this.handleVerifyPassInput.bind(this)} required/>
						<span className="icon is-small is-left">
							<i className="fa fa-key"></i>
						</span>
						<span className="icon is-small is-right">
							<i className="fa fa-warning"></i>
						</span>
					</p>
					<span className="help is-danger">Please enter a valid password longer than 4 chars.</span>
				</div>
			);
		} else if (this.state.passMatchErr === 'visible' && this.state.passMatchValid === false) {
			return (
				<div className="field">
					<label className="label is-small">Verify Password</label>
					<p className="control has-icons-left has-icons-right icon-danger">
						<input className="input is-danger" defaultValue={this.state.passVerifyText} type="password" placeholder="******" onChange={this.handleVerifyPassInput.bind(this)} required/>
						<span className="icon is-small is-left">
							<i className="fa fa-key"></i>
						</span>
						<span className="icon is-small is-right">
							<i className="fa fa-times"></i>
						</span>
					</p>
					<span className="help is-danger">Passwords Do not Match</span>
				</div>
			);
		} else if (this.state.passMatchErr === 'invisible' && this.state.passMatchValid === true) {
			return (
				<div className="field">
					<label className="label is-small">Verify Password</label>
					<p className="control has-icons-left has-icons-right icon-success">
						<input className="input is-success" defaultValue={this.state.passVerifyText} type="password" placeholder="******" onChange={this.handleVerifyPassInput.bind(this)} required/>
						<span className="icon is-small is-left">
							<i className="fa fa-key"></i>
						</span>
						<span className="icon is-small is-right">
							<i className="fa fa-check"></i>
						</span>
					</p>
				</div>
			);
		} else if (this.state.passVerifyErr === 'invisible' && this.state.passVerifyValid === true) {
			return (
				<div className="field">
					<label className="label is-small">Verify Password</label>
					<p className="control has-icons-left has-icons-right icon-success">
						<input className="input is-success" defaultValue={this.state.passVerifyText} type="password" placeholder="******" onChange={this.handleVerifyPassInput.bind(this)} required/>
						<span className="icon is-small is-left">
							<i className="fa fa-key"></i>
						</span>
						<span className="icon is-small is-right">
							<i className="fa fa-check"></i>
						</span>
					</p>
				</div>
			);
		} // end verifyPass if/else

	} //end renderPassVerify

	render() {
		return (
			<div className="">
				<div className="login-container is-overlay">
					<div className="signIn-card">
						<header className="modal-card-head">
							<h3 className="modal-card-title has-text-centered">Sign Up</h3>
						</header>
						<form className="modal-card-body" onSubmit={this.handleUserSignUp.bind(this)}>
							{this.renderName()}
							{this.renderEmail()}
							{this.renderPass()}
							{this.renderPassVerify()}
							<div className="field is-group">
								<p className="control">
									<input type="submit" className="button is-success is-outlined" disabled={!this.state.nameValid && !this.state.emailValid && !this.state.passValid && !this.state.passVerifyValid && !this.state.passMatchValid} value="Sign Up"/>
								</p>
								<p className="control">
									<button onClick={this.handleCancel} className="button is-light is-outlined">Cancel</button>
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
