import React from 'react';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';
import App from './pages/App';
import Login from './pages/Login'
import SignedIn from './pages/SignedIn'
import Chat from './pages/Chat'
import ForOFour from './pages/FourOFour';

const Routes = props => {
	return (
		<Router history={browserHistory}>
			<Route path="/" component={App} name="App" >
				<IndexRoute component={Login} name="Login" />
				<Route path="/chat" component={Chat} name="Chat" />
				<Route path="/SignedIn" component={SignedIn} name="Welcome" />
				<Route path="*" component={ForOFour} name="404: No Match for route" />
			</Route>
		</Router>
	);
};

export default Routes;
