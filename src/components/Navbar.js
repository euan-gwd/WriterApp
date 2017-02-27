import React from 'react';

class NavBar extends React.Component {
	render() {
		return (
				<nav className="nav nav-tabs sticky-top bg-faded justify-content-between">
					<ul className="nav">
					<li className="nav-item"><a href="#" className="nav-link"><i className="fa fa-home fa-lg fa-fw" aria-hidden="true"></i>Home</a></li>
					<li className="nav-item"><a href="#" className="nav-link"><i className="fa fa-bell fa-lg fa-fw" aria-hidden="true"></i>Notifications</a></li>
					<li className="nav-item"><a href="#" className="nav-link"><i className="fa fa-envelope fa-lg fa-fw" aria-hidden="true"></i>Messages</a></li>
				</ul>
					<p className="navbar-brand">
						{/* <img alt="Brand" src={logo} width="35" height="35" /> */}
					</p>
					<a className="nav-button" role="button">
						<i className="fa fa-user-circle-o fa-2x" aria-hidden="true"></i>
					</a>
				</nav>
		);
	}
}

export default NavBar;
