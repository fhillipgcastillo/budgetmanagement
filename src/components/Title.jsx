//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

// create a component
const Title = props => {
  return <Text style={styles.title}>{props.text}</Text>;
};
export const SubTitle = props => (
  <Text style={styles.subtitle}>{props.text}</Text>
);

// define your styles
const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    color: "#fff"
  },
  subtitle: {
    fontSize: 18,
    color: "#fff"
  }
});

//make this component available to the app
export default Title;
