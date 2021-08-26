import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export const LabeledIntegerInputForm = props => (
<View style={styles.LabelInputForm}>
  <Text style={styles.inputTitle}>{props.title}: </Text>
  <TextInput style={styles.inputTitle} placeholder={props.title || ""} selectTextOnFocus={true} onChangeText={props.onChangeText
    ? newValue => props.onChangeText(parseFloat(newValue + ".00"))
    : () => { }} value={props.value ? props.value.toString() : "0"} />
</View>);

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    color: "#000",
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