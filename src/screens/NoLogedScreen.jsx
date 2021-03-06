//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

class NoLogedScreen extends Component {
  
  changeScreen=(screenName)=>{
    this.props.navigation.navigate(screenName);
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>Home</Text>
        <View>
          <Button title="Log in" onPress={() => this.changeScreen("MainNavigation")} />
        </View>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center"
  }
});

//make this component available to the app
export default NoLogedScreen;
