import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyA7rSLgtDXwdc_nj4fmwYuTilQN19a4ytY",
  authDomain: "react-chat-app-f64bb.firebaseapp.com",
  databaseURL: "https://react-chat-app-f64bb.firebaseio.com",
  projectId: "react-chat-app-f64bb",
  storageBucket: "react-chat-app-f64bb.appspot.com",
  messagingSenderId: "962792118288"
};

const base = firebase.initializeApp(config, 'base');

export default base;
