//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, Picker } from "react-native";
import {
  getPaymentType,
  TYPEOFPAYMENTS,
} from "../constants";
import LabeledInputWrapper from "./LabeledInputWrapper";

// create a component
class PaymentTypeSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentType: props.paymentType || 1,
      enabled: props.enabled || false,
    };
  }
  getPaymentType = (key) => {
    return getPaymentType(key);
  };
  handleSelectedValueChange = (newValue) => {
    this.setState({ paymentType: newValue });
    this.props.handleSelectedValueChange &&
      this.props.handleSelectedValueChange(newValue);
  };
  render() {
    return (
      <LabeledInputWrapper style={styles.LabelInputForm}>
        <Text style={styles.inputTitle}>Payment Type: </Text>
        <View style={styles.picker}>
          <Picker
            style={styles.inputTitle}
            selectedValue={this.state.paymentType}
            onValueChange={this.handleSelectedValueChange}
            enabled={this.state.enabled}
          >
            {Object.keys(TYPEOFPAYMENTS).map((cat) => (
              <Picker.Item
                key={TYPEOFPAYMENTS[cat].toString()}
                label={cat}
                value={TYPEOFPAYMENTS[cat]}
              />
            ))}
          </Picker>
        </View>
      </LabeledInputWrapper>
    );
  }
}

// define your styles
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
    flexDirection: "column",
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
export default PaymentTypeSelect;
