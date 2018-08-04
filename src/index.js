import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './router';
import './index.css';

import { SocketProvider } from 'socket.io-react';
import io from 'socket.io-client';
import { port, host } from "./const/node-server-config";

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducers/index';

const socket = io.connect(`${host}:${port}`);
const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render((
  <SocketProvider socket={socket}>
    <Provider store={store}>
      { Routes }
    </Provider>
  </SocketProvider>
), document.getElementById('root'));
