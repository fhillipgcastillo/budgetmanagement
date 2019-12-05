//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { connect } from "react-redux";
import {
  PAGES,
  SPENTS_CATEGORIES,
  TYPEOFPAYMENTS,
  getCategory,
  getPaymentType,
  NAVIGATION_SCREENS
} from "../constants";
import { changeCurrentView, removeAccount } from "../actions";

// create a component
class AccountDetail extends Component {
  // static navigationOptions = {
  //   title: this.state.title || "Details"
  // };
  componentWillMount() {
    let account = this.props.navigation.getParam("account");
    this.refleshAccount(account);
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
  refleshAccount = (account)=>{
    this.setState({
      ...this.props.states,
      ...account
    });
  }
  handleEdit = () => {
    this.props.navigation.navigate(NAVIGATION_SCREENS.NewAccount, {
      account: this.props.navigation.getParam("account"),
      editMode: true,
      refleshAccount: (account) => this.refleshAccount(account),
    });
  };
  render() {
    let account = this.props.navigation.getParam("account");

    return (
      <View style={styles.container}>
        <React.Fragment>
          <View style={styles.inlineDetails}>
            <Text style={styles.title}>{this.state.title}</Text>
            <Text style={styles.detail}>{this.state.description}</Text>
          </View>
          <View style={styles.inlineDetails}>
            <Text style={styles.label, styles.detail}>Dept of </Text>
            <Text style={styles.detail}>{this.state.amount}</Text>
          </View>
          <View style={styles.inlineDetails}>
            <Text style={styles.label, styles.detail}>Category as </Text>
            <Text style={styles.detail}>
              {this.getCategory(this.state.category)}
            </Text>
          </View>
          <View style={styles.inlineDetails}>
            <Text style={styles.detail}>
              {this.getPaymentType(this.state.paymentType)}
            </Text>
            <Text style={styles.label, styles.detail}>Payment </Text>
          </View>
          {this.state.paymentType !== TYPEOFPAYMENTS.Unique ? (
            <React.Fragment>
              <View style={styles.inlineDetails}>
                <Text style={styles.label, styles.detail}>
                  Limit to Spend:{" "}
                </Text>
                <Text style={styles.detail}>{this.state.amountLimit}</Text>
              </View>
              <View style={styles.inlineDetails}>
                <Text style={styles.label, styles.detail}>
                  Day of month to pay:{" "}
                </Text>
                <Text style={styles.detail}>{this.state.dayOfMothToPay}</Text>
              </View>
              <View style={styles.inlineDetails}>
                <Text style={styles.label, styles.detail}>
                  Max day of month to pay:{" "}
                </Text>
                <Text style={styles.detail}>{this.state.maxDayOfMothToPay}</Text>
              </View>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <View style={styles.inlineDetails}>
                <Text style={styles.label, styles.detail}>
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
        </React.Fragment>
        <View style={styles.actionContainer}>
          <Button
            style={styles.actionBtn}
            title="Remove"
            onPress={this.handleRemove}
          />
          <Button
            style={styles.actionBtn}
            title="Edit"
            onPress={this.handleEdit}
            disabled={account === null || account.id <= 0}
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
    fontSize: 18,
    color: "#fff",
  },
  inlineDetails: {
    flexDirection: "row",
    color: "white"
  },
  label: {
    fontWeight: "bold",
    fontSize: 20,
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
