import React from 'react';
import * as ReactDOM from 'react-dom';
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import posts from './Post/PostReducer';
import auth from './Auth/AuthReducer';
import './index.css';
import App from './App';

// Middleware and store enhancers
const enhancers = [
    applyMiddleware(thunk),
];

const initialStore = createStore(combineReducers({ posts, auth }), { }, compose(...enhancers));

ReactDOM.render(<App store={initialStore}/>, document.getElementById('root'));
