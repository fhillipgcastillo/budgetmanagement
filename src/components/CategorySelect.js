//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, Picker } from "react-native";
import { SPENTS_CATEGORIES, getCategory } from "../constants";
import LabeledInputWrapper from "./LabeledInputWrapper";

// create a component
class CategorySelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: props.category || 1,
      enabled: props.enabled || false,
    };
  }
  getCategory = (key) => {
    return getCategory(key);
  };
  handleSelectedValueChange = (newValue) => {
    this.setState({ category: newValue });
    this.props.handleSelectedValueChange &&
      this.props.handleSelectedValueChange(newValue);
  };
  render() {
    return (
      <LabeledInputWrapper>
        <Text style={styles.inputTitle}>Category: </Text>
        <View style={styles.picker}>
          <Picker
            selectedValue={this.state.category}
            onValueChange={this.handleSelectedValueChange}
            enabled={this.state.enabled}
          >
            {Object.keys(SPENTS_CATEGORIES).map((cat) => (
              <Picker.Item
                key={SPENTS_CATEGORIES[cat].toString()}
                label={cat}
                value={SPENTS_CATEGORIES[cat]}
              />
            ))}
          </Picker>
        </View>
      </LabeledInputWrapper>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",

    width: "100%",
    height: "100%",
  },
  actionContainer: {
    // flex:1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  inputTitle: {
    flex: 1,
    color: "#000",
    fontSize: 20,
  },
  actionBtns: {
    height: 20,
    margin: 5,
  },
  LabelInputForm: {
    display: "flex",
    flexDirection: "row",
  },
  picker: {
    flex: 1,
    paddingHorizontal: 3.5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#000",
    width: "100%",
  },
});

//make this component available to the app
export default CategorySelect;
