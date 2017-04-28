import React from 'react';
import {Switch, Case, Default} from 'jsx-switch';
import SignIn from './SignIn';
import SignUp from './SignUp';
import logo from '../logo.svg';
import "./layout.css";
import './icon-colors.css';

class SignedOut extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			signInUser: false,
			signUpUser: false,
			route: 'Home'
		}
	} //end constructor

	handleHomeRoute = (evt) => {
		this.setState({route: 'Home'})
	} //end handleHomeRoute

	handleSignInRoute = (evt) => {
		this.setState({route: 'SignIn', signInUser: true})
	} //end handleSignInRoute

	handleSignUpRoute = (evt) => {
		this.setState({route: 'SignUp', signUpUser: true})
	} //end handleSignUpRoute

	onUserSignIn(newState) {
		this.setState({signInUser: newState})
	} //end onUserSignIn

	onUserSignUp(newState) {
		this.setState({signUpUser: newState})
	} //end onUserSignUp

	Home() {
		return (
			<section className="scribe-container">
				<div className="centered">
					<div className="container">
						<h1 className="title has-text-centered">
							What's a happening...?
						</h1>
						<h2 className="subtitle has-text-centered">
							Join the conversation...
						</h2>
					</div>
				</div>
			</section>
		);
	} //end Home

	render() {
		return (
			<div>
				<nav className="nav has-shadow">
					<div className="nav-center">
						<div className="nav-item">
							<img src={logo} alt="logo" className="App-logo"/>
							<h1 className="title is-hidden-mobile">Village Scriber</h1>
						</div>
						<div className="nav-item"></div>
						<div className="nav-item">
							<a id="sign-in" className="button is-success is-outlined is-small" onClick={this.handleSignInRoute.bind(this)}>
								<span className="icon is-small">
									<i className="fa fa-sign-in"></i>
								</span>
								<span>Log In</span>
							</a>
						</div>
						<div className="nav-item">
							<a id="sign-in" className="button is-info is-outlined is-small" onClick={this.handleSignUpRoute.bind(this)}>
								<span className="icon is-small">
									<i className="fa fa-user-plus"></i>
								</span>
								<span>Sign Up</span>
							</a>
						</div>
					</div>
				</nav>
				<Switch>
					<Case expr={this.state.route === 'SignIn'}>
						<SignIn/>
					</Case>
					<Case expr={this.state.route === 'SignUp'}>
						<SignUp/>
					</Case>
					<Default>
						{this.Home()}
					</Default>
				</Switch>
			</div>
		);
	} //end render
}

export default SignedOut;
