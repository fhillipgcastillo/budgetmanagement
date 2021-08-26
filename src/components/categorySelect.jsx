//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, Picker } from "react-native";
import { SPENTS_CATEGORIES, getCategory } from "../constants";

// create a component
class CategorySelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: props.category || 1,
      enabled: props.enabled || false
    };
  }
  getCategory = key => {
    return getCategory(key);
  };
  handleSelectedValueChange = newValue => {
    this.setState({ category: newValue });
    this.props.handleSelectedValueChange &&
      this.props.handleSelectedValueChange(newValue);
  };
  render() {
    return (
      <View style={styles.LabelInputForm}>
        <Text style={styles.inputTitle}>Category: </Text>
        <Picker
          style={(styles.inputTitle)}
          selectedValue={this.state.category}
          onValueChange={this.handleSelectedValueChange}
          enabled={this.state.enabled}
        >
          {Object.keys(SPENTS_CATEGORIES).map(cat => (
            <Picker.Item
              key={SPENTS_CATEGORIES[cat].toString()}
              label={cat}
              value={SPENTS_CATEGORIES[cat]}
            />
          ))}
        </Picker>
      </View>
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
    height: "100%"
  },
  actionContainer: {
    // flex:1,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  inputTitle: {
    flex: 1,
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

//make this component available to the app
export default CategorySelect;
