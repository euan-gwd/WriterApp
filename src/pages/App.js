import React from 'react';
import logo from '../logo.svg';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <nav className="nav nav-tabs sticky-top bg-faded justify-content-center">
                    <p className="navbar-brand">
                        <img alt="Brand" src={logo} width="35" height="35" />
                    </p>
                </nav>
                <br />
                {this.props.children}
            </div>
        )
    }
}