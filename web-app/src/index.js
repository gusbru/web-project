import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Router } from "react-router-dom";
import InternalRouters from "./containers/InternalRouters";
import configureHistory from "./containers/InternalRouters/configureHistory";
import * as serviceWorker from './serviceWorker';

const history = configureHistory();

ReactDOM.render(
    <Router history={history}>
        <InternalRouters />
    </Router>,
    document.getElementById('root')
    );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
