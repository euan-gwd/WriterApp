import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyA7rSLgtDXwdc_nj4fmwYuTilQN19a4ytY",
  authDomain: "react-chat-app-f64bb.firebaseapp.com",
  databaseURL: "https://react-chat-app-f64bb.firebaseio.com",
  storageBucket: "react-chat-app-f64bb.appspot.com",
  messagingSenderId: "962792118288"
};
let base = firebase.initializeApp(config);

export default base;
