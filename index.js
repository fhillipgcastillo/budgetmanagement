import React, { Component } from "react";
import { Provider } from "react-redux";
import configureStore from "./src/configureStore";
import AppRouting from "./src/AppRoute";
import { ThemeProvider } from "react-native-elements";
const store = configureStore();
export default () => (
  <Provider store={store}>
    <ThemeProvider>
      <AppRouting />
    </ThemeProvider>
  </Provider>
);
