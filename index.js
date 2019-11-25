import React, { Component } from 'react';
import {Provider} from 'react-redux';
import App from "./src/components/App";
import configureStore from './src/configureStore';

const store = configureStore()
export default () => (<Provider store={store}><App /></Provider>);
