//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

// create a component
class AccountDetail extends Component {
  constructor(props){
    super(props);

    this.state = {
      id: props.id,
      title: props.title,
      description: props.description,
      amount: props.amount,
      uniquePayement: props.uniquePayement,
      dayOfMothToPay: props.dayOfMothToPay,
      maxDayOfMothToPay: props.maxDayOfMothToPay,
      customDateToPay: props.customDateToPay,
      maxDateToPay: props.maxDateToPay,
      category: props.category,
      paymentType: props.paymentType,
      amountLimit: props.amountLimit,
    }
  };
  handleBack = ()=>{
    this.props.goBack();
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
          <Text style={styles.detail}>{this.state.uniquePayement}</Text>
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
          <Text style={styles.detail}>{this.state.category}</Text>
        </View>
        <View style={styles.inlineDetails}>
          <Text style={styles.detail, styles.label}>paymentType: </Text>
          <Text style={styles.detail}>{this.state.paymentType}</Text>
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
    flexDirection: "row"
  },
  label:{ 
    fontWeight: "bold",
    fontSize: 20
  }
});

//make this component available to the app
export default AccountDetail;
