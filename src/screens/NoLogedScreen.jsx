//import liraries
import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import Button from "../components/Button";

class NoLogedScreen extends Component {
  
  changeScreen=(screenName)=>{
    this.props.navigation.navigate(screenName);
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Button title="Log in" onPress={() => this.changeScreen("MainNavigation")}  />
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignContent: "center", 
    flexDirection: "column",
    padding: 15
  }
});

//make this component available to the app
export default NoLogedScreen;
