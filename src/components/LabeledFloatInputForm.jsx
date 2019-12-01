import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
export const LabeledFloatInputForm = props => (<View style={styles.LabelInputForm}>
  <Text style={styles.inputTitle}>{props.title}: </Text>
  <TextInput style={styles.inputTitle} selectTextOnFocus={true} placeholder={props.title || ""} onChangeText={props.onChangeText
    ? newValue => props.onChangeText(parseFloat(newValue))
    : () => { }} value={props.value ? props.value.toString() : "0.00"} />
</View>);

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50",
    width: "100%",
    height: "100%",
    padding: 20
  },
  actionContainer: {
    // flex:1,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  inputTitle: {
    color: "#fff",
    fontSize: 20
  },
  actionBtns: {
    height: 20,
    margin: 5
  },
  LabelInputForm: {
    display: "flex",
    flexDirection: "row"
  }
});