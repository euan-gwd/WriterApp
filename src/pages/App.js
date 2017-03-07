import React from 'react';
import logo from '../logo.svg';

export default class App extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="d-flex justify-content-center">
                    <img src={logo} alt="logo" className="mx-auto align-self-center" />
                </div>
                {this.props.children}
            </div>
        )
    }
}