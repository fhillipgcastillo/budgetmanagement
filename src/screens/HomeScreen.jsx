//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import App from '../components/App';

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Manage Accounts',
    headerStyle: {
      backgroundColor: '#2c3e50',
    },
    headerTintColor: '#fff',
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
     <App />
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
  },
});

//make this component available to the app
export default HomeScreen;
