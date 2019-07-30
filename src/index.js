import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase'
import 'bootstrap/dist/css/bootstrap.css';

var config = {
  apiKey: "AIzaSyAG6clq-ZoAIvwMFyIULzzYKByh5WFS5LE",
  authDomain: "arize-e1850.firebaseapp.com",
  databaseURL: "https://arize-e1850.firebaseio.com",
  projectId: "arize-e1850",
  storageBucket: "arize-e1850.appspot.com",
  messagingSenderId: "440285589146",
  appId: "1:440285589146:web:a7cf0a18ea85b6b0"
}; 

firebase.initializeApp(config)

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
