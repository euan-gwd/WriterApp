import React from 'react';
import { browserHistory, Router, Route } from 'react-router';
import App from './pages/App';
import Login from './pages/Login';
import ForOFour from './pages/FourOFour';

const Routes = props => {
	return (
		<Router history={browserHistory}>
			<Route path="/" component={App} name="App" >
				<Route path="/login" component={Login} name="Login" />
				<Route path="*" component={ForOFour} name="404: No Match for route" />
			</Route>
		</Router>
	);
};

export default Routes;
