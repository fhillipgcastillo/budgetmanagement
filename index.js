import React, { Component } from "react";
import { Provider } from "react-redux";
import configureStore from "./src/configureStore";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./src/screens/HomeScreen";
import { createAppContainer } from "react-navigation";

import AppRouting from './src/AppRoute';

const store = configureStore();
export default () => (
  <Provider store={store}>
      <AppRouting />
  </Provider>
);
