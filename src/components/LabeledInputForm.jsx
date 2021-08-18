import React from "react";
import { View, Text, TextInput, StyleSheet
 } from "react-native";
export const LabeledInputForm = props => (
  <View style={styles.LabelInputForm}>
    <Text style={styles.inputTitle}>{props.title}: </Text>
    <TextInput style={styles.inputTitle} placeholder={props.title || ""} onChangeText={props.onChangeText || null} value={props.value || ""} />
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