//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { connect } from "react-redux";
import {
  PAGES,
  SPENTS_CATEGORIES,
  TYPEOFPAYMENTS,
  getCategory,
  getPaymentType
} from "../constants";
import { changeCurrentView, removeAccount } from "../actions";

// create a component
class AccountDetail extends Component {
  // static navigationOptions = {
  //   title: this.state.title || "Details"
  // };
  componentWillMount() {
    let account = this.props.navigation.getParam("account");
    this.setState({
      ...this.props.states,
      id: account.id,
      title: account.title,
      description: account.description,
      amount: account.amount,
      uniquePayement: account.uniquePayement,
      dayOfMothToPay: account.dayOfMothToPay,
      maxDayOfMothToPay: account.maxDayOfMothToPay,
      customDateToPay: account.customDateToPay,
      maxDateToPay: account.maxDateToPay,
      category: account.category,
      paymentType: account.paymentType,
      amountLimit: account.amountLimit
    });
  }
  handleBack = () => {
    this.props.navigation.goBack();
  };
  getCategory = key => {
    return getCategory(key);
  };
  getPaymentType = key => {
    return getPaymentType(key);
  };
  handleRemove = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure want to delete this account?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            this.props.removeAccount(this.state.id);
            this.props.navigation.goBack();
          }
        }
      ],
      { cancelable: false }
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inlineDetails}>
          <Text style={styles.title}>{this.state.title}</Text>
          <Text style={styles.detail}>{this.state.description}</Text>
        </View>
        <View style={styles.inlineDetails}>
          <Text style={(styles.detail, styles.label)}>Dept of </Text>
          <Text style={styles.detail}>{this.state.amount}</Text>
        </View>
        <View style={styles.inlineDetails}>
          <Text style={(styles.detail, styles.label)}>Category: </Text>
          <Text style={styles.detail}>
            {this.getCategory(this.state.category)}
          </Text>
        </View>
        <View style={styles.inlineDetails}>
          <Text style={(styles.detail, styles.label)}>Payment type: </Text>
          <Text style={styles.detail}>
            {this.getPaymentType(this.state.paymentType)}
          </Text>
        </View>
        {this.state.paymentType !== TYPEOFPAYMENTS.Unique ? (
          <React.Fragment>
            <View style={styles.inlineDetails}>
              <Text style={(styles.detail, styles.label)}>
                Limit to Spend:{" "}
              </Text>
              <Text style={styles.detail}>{this.state.amountLimit}</Text>
            </View>
            <View style={styles.inlineDetails}>
              <Text style={(styles.detail, styles.label)}>
                Day of month to pay:{" "}
              </Text>
              <Text style={styles.detail}>{this.state.dayOfMothToPay}</Text>
            </View>
            <View style={styles.inlineDetails}>
              <Text style={(styles.detail, styles.label)}>
                Max day of month to pay:{" "}
              </Text>
              <Text style={styles.detail}>{this.state.maxDayOfMothToPay}</Text>
            </View>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <View style={styles.inlineDetails}>
              <Text style={(styles.detail, styles.label)}>
                customDateToPay:{" "}
              </Text>
              <Text style={styles.detail}>{this.state.customDateToPay}</Text>
            </View>
            <View style={styles.inlineDetails}>
              <Text style={(styles.detail, styles.label)}>maxDateToPay: </Text>
              <Text style={styles.detail}>{this.state.maxDateToPay}</Text>
            </View>
          </React.Fragment>
        )}

        <View title="actionContainer" style={styles.actionContainer}>
          <Button
            style={styles.actionBtn}
            title="Remove"
            onPress={this.handleRemove}
          />
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
    alignItems: "center",
    backgroundColor: "#2c3e50"
  },
  title: {
    fontSize: 28,
    color: "#fff"
  },
  detail: {
    fontSize: 18
  },
  inlineDetails: {
    flexDirection: "row",
    color: "white"
  },
  label: {
    fontWeight: "bold",
    fontSize: 20
  },
  actionContainer: {
    flex: 1,
    justifyContent: "space-around",
    flexDirection: "row",
    maxHeight: 30,
    marginBottom: 10,
    marginTop: 15
  },
  actionBtn: {
    height: 20,
    margin: 5
  }
});

function mapStateToProps(state) {
  return {
    // states: {accountDetail:state.accountDetail}
  };
}

function mapDispatchToProps(dispatch) {
  return {
    removeAccount: accountId => dispatch(removeAccount(accountId))
  };
}

//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(AccountDetail);
