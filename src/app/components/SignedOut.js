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
	}

	handleHomeRoute = (evt) => {
		this.setState({route: 'Home'})
	}

	handleSignInRoute = (evt) => {
		this.setState({route: 'SignIn', signInUser: true})
	}

	handleSignUpRoute = (evt) => {
		this.setState({route: 'SignUp', signUpUser: true})
	}

	onUserSignIn(newState) {
		this.setState({signInUser: newState})
	}

	onUserSignUp(newState) {
		this.setState({signUpUser: newState})
	}

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
	}

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
						<SignIn />
					</Case>
					<Case expr={this.state.route === 'SignUp'}>
						<SignUp />
					</Case>
					<Default>
						{this.Home()}
					</Default>
				</Switch>

			</div>
		);
	}

}

export default SignedOut;
