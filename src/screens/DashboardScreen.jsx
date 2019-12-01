//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

// create a component
class DashboardScreen extends Component {
  static navigationOptions = {
    title: "Central control",
    headerStyle: {
      backgroundColor: "#2c3e50"
    },
    headerTintColor: "#fff"
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>DashboardScreen</Text>
        <Button 
          title="Go to Accouts"
          onPress={()=>this.props.navigation.navigate("ManageAccounts")}
        />
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50"
  }
});

//make this component available to the app
export default DashboardScreen;
