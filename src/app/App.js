import React from 'react';
import * as firebase from 'firebase';
import config from './firebase.config';
import {Switch, Case, Default} from 'jsx-switch';
import Home from './components/Home';
import SignedOut from './components/SignedOut';
import Messages from './components/Messages';
import UserProfile from './components/UserProfile';
import logo from './logo.svg';
import defaultUserPic from './Default_User_Pic.svg';
import './App.css';

firebase.initializeApp(config);

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			auth: false,
			route: 'Home'
		}
	}

	handleHomeRoute = (evt) => {
		this.setState({route: 'Home'})
	}

	handleMessagesRoute = (evt) => {
		this.setState({route: 'Messages'})
	}

	handleUserProfileRoute = (evt) => {
		this.setState({route: 'UserProfile'})
	}

	componentDidMount() {
		this.removeListener = firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.setState({auth: user});
			} else {
				this.setState({auth: false});
			}
		});
	}

	componentWillUnmount() {
		this.removeListener();
	}

	render() {
		return (
			<div>
				{(this.state.auth)
					? <div className="">
							<nav className="nav has-shadow">
								<div className="grid-container">
									<a className={(this.state.route === 'Home')
										? "nav-item is-tab is-active"
										: "nav-item is-tab"} data-balloon="Home" data-balloon-pos="down" onClick={this.handleHomeRoute}>
										<i className="fa fa-home fa-2x"></i>
									</a>
									<a className={(this.state.route === 'Messages')
										? "nav-item is-tab is-active"
										: "nav-item is-tab"} data-balloon="Messages" data-balloon-pos="down" onClick={this.handleMessagesRoute}>
										<i className="fa fa-comments-o fa-2x"></i>
									</a>
									<div className="nav-item">
										<img src={logo} alt="logo" className="App-logo"/>
										<h1 className="title is-hidden-mobile">Village Scriber</h1>
									</div>
									<a className={(this.state.route === 'UserProfile')
										? "nav-item is-tab is-active"
										: "nav-item is-tab"} data-balloon="View Profile" data-balloon-pos="down" onClick={this.handleUserProfileRoute}>
										{(this.state.auth.photoURL === null)
											? <img src={defaultUserPic} alt="defaultProfilePic" className="default-icon nav-spacing nav-image-is-rounded"/>
											: <img src={this.state.auth.photoURL} alt="profilePic" className="nav-spacing nav-image-is-rounded"/>}
									</a>
								</div>
							</nav>
							<Switch>
								<Case expr={this.state.route === 'Home'}>
									<Home user={this.state.auth}/>
								</Case>
								<Case expr={this.state.route === 'Messages'}>
									<Messages user={this.state.auth}/>
								</Case>
								<Case expr={this.state.route === 'UserProfile'}>
									<UserProfile user={this.state.auth}/>
								</Case>
								<Default>
									<Home/>
								</Default>
							</Switch>
						</div>
					: <div>
						<SignedOut/>
					</div>}
			</div>
		);
	}
}

export default App;
