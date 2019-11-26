import React, { Component } from "react";
import { Provider } from "react-redux";
import configureStore from "./src/configureStore";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./src/screens/HomeScreen";
import { createAppContainer } from "react-navigation";

const MainNavigator = createStackNavigator({
  Home: { screen: HomeScreen }
  // Profile: {screen: ProfileScreen},
},
{
  initialRouteName: 'Home',
});

const AppContainer = createAppContainer(MainNavigator);

const store = configureStore();
export default () => (
  <Provider store={store}>
      <AppContainer />
  </Provider>
);
