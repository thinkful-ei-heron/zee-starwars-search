import React from 'react';
import ReactDOM from 'react-dom';
import history from './components/history';
import {Router} from 'react-router-dom';
import App from './App';
import './index.css';


ReactDOM.render(
    <Router history={history}>
    <App />
    </Router>, 
    document.getElementById('root')
);

