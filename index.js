import React, { Component } from "react";
import { Provider } from "react-redux";
import configureStore from "./src/configureStore";
import AppRouting from "./src/AppRoute";
const store = configureStore();
export default () => (
  <Provider store={store}>
      <AppRouting />
  </Provider>
);
