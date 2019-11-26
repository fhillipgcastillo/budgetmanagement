//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Switch } from 'react-native';
import { connect } from 'react-redux';
import { PAGES, SPENTS_CATEGORIES, TYPEOFPAYMENTS, getCategory, getPaymentType } from '../constants';
import {changeCurrentView} from '../actions';

// create a component
class AccountDetail extends Component {
  componentWillMount(){ 
    this.setState({
      ...this.props.states,
      id: this.props.id,
      title: this.props.title,
      description: this.props.description,
      amount: this.props.amount,
      uniquePayement: this.props.uniquePayement,
      dayOfMothToPay: this.props.dayOfMothToPay,
      maxDayOfMothToPay: this.props.maxDayOfMothToPay,
      customDateToPay: this.props.customDateToPay,
      maxDateToPay: this.props.maxDateToPay,
      category: this.props.category,
      paymentType: this.props.paymentType,
      amountLimit: this.props.amountLimit,
    });
  };
  handleBack = ()=>{
    this.props.goBackTo(PAGES.dashboard);
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
        <View>
          <Button
            title="Back"
            onPress={this.handleBack}
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
      currentView: state.currentView
    }
  }
};

function mapDispatchToProps (dispatch) {
  return {
    goBackTo: (page) => dispatch(changeCurrentView(page))
  }
};

//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(AccountDetail);
