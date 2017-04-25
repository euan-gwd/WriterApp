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
			userPhoto: null,
			nameErr: 'invisible',
			emailErr: 'invisible',
			passErr: 'invisible'
		};
	}

	handleUserSignUp = (evt) => {
		evt.preventDefault();
		let name = this.state.nameText.toString();
		let email = this.state.emailText.toString();
		let pass = this.state.passText.toString();
		let nameValid = false;
		let emailValid = false;
		let passValid = false;

		if (name.length < 4) {
			this.setState({nameErr: 'visible'});
			nameValid = false;
		} else if (name.length === '') {
			this.setState({nameErr: 'invisible'});
			nameValid = false;
		} else {
			this.setState({nameErr: 'invisible'});
			nameValid = true;
		} //end name validation

		if (email.length < 4) {
			this.setState({emailErr: 'visible'});
			emailValid = false;
		} else if (email.length === '') {
			this.setState({emailErr: 'invisible'});
			emailValid = false;
		} else {
			this.setState({emailErr: 'invisible'});
			emailValid = true;
		} //end email validation

		if (pass.length < 4) {
			this.setState({passErr: 'visible'});
			passValid = false;
		} else if (pass.length === '') {
			this.setState({passErr: 'invisible'});
			passValid = false;
		} else {
			this.setState({passErr: 'invisible'});
			passValid = true;
		} //end password validation

		if (nameValid && emailValid && passValid) {
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
	} //end handleEmailInput

	handleEmailInput = (evt) => {
		this.setState({emailText: evt.target.value});
	} //end handleEmailInput

	handlePassInput = (evt) => {
		this.setState({passText: evt.target.value});
	} //end handlePassInput

	// componentWillUnmount() {
	//   this.setState({emailText: '', passText: ''});
	// }

	render() {
		return (
			<div className="modal-background">
				<div className="login-container is-overlay">
					<div className="signIn-card">
						<header className="modal-card-head">
							<h3 className="modal-card-title has-text-centered">Sign Up</h3>
						</header>
						<form className="modal-card-body" onSubmit={this.handleUserSignUp.bind(this)}>

							{(this.state.nameErr === 'visible')
								? <div className="field">
										<p className="control has-icons-left has-icons-right">
											<input className="input is-danger" defaultValue={this.state.nameText} type="text" placeholder="DisplayName" onChange={this.handleNameInput.bind(this)}/>
											<span className="icon is-small is-left">
												<i className="fa fa-user"></i>
											</span>
											<span className="icon is-small">
												<i className="fa fa-warning"></i>
											</span>
										</p>
										<span className="help is-danger">Please enter a valid name longer than 4 chars.</span>
									</div>
								: <div className="field">
									<p className="control has-icons-left">
										<input className="input" defaultValue={this.state.nameText} type="text" placeholder="DisplayName" onChange={this.handleNameInput.bind(this)}/>
										<span className="icon is-small">
											<i className="fa fa-user"></i>
										</span>
									</p>
								</div>}

							{(this.state.emailErr === 'visible')
								? <div className="field">
										<p className="control has-icons-left has-icons-right">
											<input className="input is-danger" defaultValue={this.state.emailText} type="email" placeholder="Email" onChange={this.handleEmailInput.bind(this)}/>
											<span className="icon is-small">
												<i className="fa fa-envelope"></i>
											</span>
											<span className="icon is-small">
												<i className="fa fa-warning"></i>
											</span>
										</p>
										<span className="help is-danger">Please enter a valid email address.</span>
									</div>
								: <div className="field">
									<p className="control has-icons-left">
										<input className="input" defaultValue={this.state.emailText} type="email" placeholder="Email" onChange={this.handleEmailInput.bind(this)}/>
										<span className="icon is-small">
											<i className="fa fa-envelope"></i>
										</span>
									</p>
								</div>}

							{(this.state.passErr === 'visible')
								? <div className="field">
										<p className="control has-icons-left has-icons-right">
											<input className="input is-danger" defaultValue={this.state.passText} type="password" placeholder="Password" onChange={this.handlePassInput.bind(this)}/>
											<span className="icon is-small">
												<i className="fa fa-lock"></i>
											</span>
											<span className="icon is-small">
												<i className="fa fa-warning"></i>
											</span>
										</p>
										<span className="help is-danger">Please enter a valid password.</span>
									</div>
								: <div className="field">
									<p className="control has-icons-left">
										<input className="input" defaultValue={this.state.passText} type="password" placeholder="Password" onChange={this.handlePassInput.bind(this)}/>
										<span className="icon is-small">
											<i className="fa fa-lock"></i>
										</span>
									</p>
								</div>}
							<div className="field is-group">
								<p className="control">
									<button type="submit" className="button is-success is-outlined">Sign Up</button>
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
	}

}

export default SignUp;
