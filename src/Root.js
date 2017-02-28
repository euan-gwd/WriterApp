import React from 'react';
import { Link } from 'react-router';

export default class Root extends React.Component {
  render() {
    return (
      <div>
							<nav className="nav nav-tabs sticky-top bg-faded justify-content-between">
								<ul className="nav">
									<li className="nav-item"><Link to="/" className="nav-link"><i className="fa fa-home fa-lg fa-fw" aria-hidden="true"></i>Home</Link></li>
									<li className="nav-item"><Link to="/Notifications" className="nav-link"><i className="fa fa-bell fa-lg fa-fw" aria-hidden="true"></i>Notifications</Link></li>
									<li className="nav-item"><Link to="/Messages" className="nav-link"><i className="fa fa-envelope fa-lg fa-fw" aria-hidden="true"></i>Messages</Link></li>
								</ul>
								<p className="navbar-brand">
									{/* <img alt="Brand" src={logo} width="35" height="35" /> */}
								</p>
								<a className="nav-button" role="button">
									<i className="fa fa-user-circle-o fa-2x" aria-hidden="true"></i>
								</a>
							</nav>
							<br/>
							{this.props.children}
      </div>
    )
  }
}
