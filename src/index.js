import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import Root from './Root';
import App from './components/chat/App';
import FourOFour from './pages/FourOFour';
import Notifications from './pages/Notifications';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';

ReactDOM.render(
	<Router history={browserHistory}>
		<Route path="/" component={Root}>
			<IndexRoute component={App} />
			<Route path="/Notifications" component={Notifications}></Route>
			<Route path="*" component={FourOFour}/>
		</Route>
	</Router>,
  document.getElementById('root')
);
