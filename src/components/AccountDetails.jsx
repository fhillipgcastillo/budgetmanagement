//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Switch } from 'react-native';
import { connect } from 'react-redux';
import { PAGES, SPENTS_CATEGORIES, TYPEOFPAYMENTS, getCategory, getPaymentType } from '../constants';
import {changeCurrentView} from '../actions';

// create a component
class AccountDetail extends Component {
  // static navigationOptions = {
  //   title: this.state.title || "Details"
  // };
  componentWillMount(){ 
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
      amountLimit: account.amountLimit,
    });
  };
  handleBack = ()=>{
    this.props.navigation.goBack();
  };
  getCategory = key => {
    return getCategory(key)
  };
  getPaymentType = key => {
    return getPaymentType(key);
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inlineDetails}>
          <Text style={styles.title}>{this.state.title}</Text>
        </View>
        <View style={styles.inlineDetails}>
          <Text style={styles.detail, styles.label}>description: </Text>
          <Text style={styles.detail}>{this.state.description}</Text>
        </View>
        <View style={styles.inlineDetails}>
          <Text style={styles.detail, styles.label}>amount: </Text>
          <Text style={styles.detail}>{this.state.amount}</Text>
        </View>
        <View style={styles.inlineDetails}>
          <Text style={styles.detail, styles.label}>uniquePayement: </Text>
          <Switch 
            onValueChange={text=>{this.setState({uniquePayement:text === "true"})}}
            value={this.state.uniquePayement}
            disabled={true}
          />
        </View>
        <View style={styles.inlineDetails}>
          <Text style={styles.detail, styles.label}>dayOfMothToPay: </Text>
          <Text style={styles.detail}>{this.state.dayOfMothToPay}</Text>
        </View>
        <View style={styles.inlineDetails}>
          <Text style={styles.detail, styles.label}>maxDayOfMothToPay: </Text>
          <Text style={styles.detail}>{this.state.maxDayOfMothToPay}</Text>
        </View>
        <View style={styles.inlineDetails}>
          <Text style={styles.detail, styles.label}>customDateToPay: </Text>
          <Text style={styles.detail}>{this.state.customDateToPay}</Text>
        </View>
        <View style={styles.inlineDetails}>
          <Text style={styles.detail, styles.label}>maxDateToPay: </Text>
          <Text style={styles.detail}>{this.state.maxDateToPay}</Text>
        </View>
        <View style={styles.inlineDetails}>
          <Text style={styles.detail, styles.label}>category: </Text>
          <Text style={styles.detail}>{this.getCategory(this.state.category)}</Text>
        </View>
        <View style={styles.inlineDetails}>
          <Text style={styles.detail, styles.label}>paymentType: </Text>
          <Text style={styles.detail}>{this.getPaymentType(this.state.paymentType)}</Text>
        </View>
        <View style={styles.inlineDetails}>
          <Text style={styles.detail, styles.label}>amountLimit: </Text>
          <Text style={styles.detail}>{this.state.amountLimit}</Text>
        </View>
        <View title="actionContainer">
        </View>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  title:{
    fontSize: 28,
    color: "#fff"
  },
  detail: {
    fontSize: 18
  },
  inlineDetails: {
    flexDirection: "row",
    color: "white",
  },
  label:{ 
    fontWeight: "bold",
    fontSize: 20
  }
});


function mapStateToProps (state) {
  return {
    states: {
    }
  }
};

function mapDispatchToProps (dispatch) {
  return {
  }
};

//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(AccountDetail);
