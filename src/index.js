import React from 'react';
import ReactDOM from 'react-dom';
import Rebase from 're-base';
import NavBar from './components/Navbar';
import Container from './components/Container';
import NewChat from './components/NewChat';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';

const base = Rebase.createClass({
  apiKey: "AIzaSyDYliJuBFjLAQO_vfH0rlioWUiKrRe_ZL4",
  authDomain: "tchatapp-586ab.firebaseapp.com",
  databaseURL: "https://tchatapp-586ab.firebaseio.com",
  storageBucket: "tchatapp-586ab.appspot.com",
  messagingSenderId: "846810590536"
});

class Main extends React.Component {
  constructor(props) {
    super(props)
				this.state= {
					messages: []
				}
  };

		componentWillMount() {
			base.bindToState('chats',{
				context: this,
				state: 'messages',
				asArray: true
			})
		};

  render() {
    return (
      <div>
							<NavBar />
							<br/>
							<NewChat chats={this.state.messages}/>
							<Container />
      </div>
    );
  }
};

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);
