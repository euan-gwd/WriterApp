import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';

ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/" component={App} />
	</Router>,
  document.getElementById('root')
);
