//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TextInput, ScrollView } from 'react-native';
import Title from './Title';
import { SPENTS_CATEGORIES, TYPEOFPAYMENTS, PAGES } from '../constants';
import { connect } from 'react-redux';
import { changeAccountDetail, createNewAccount, changeCurrentView } from '../actions';

const LabelInputForm = props => (
    <View>
      {/* <Text style={styles.imputTitle}>{props.title}</Text> */}
      <TextInput 
        placeholder={props.title}
        onChangeText={props.onChangeText}
        value={props.value} 
      />
    </View>
);

// create a component
class NewItem extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      id: 0,
      title:"",/* account title */
      description: "",
      amount: 0,
      uniquePayement: false,
      dayOfMothToPay: 0,
      maxDayOfMothToPay: 0,
      customDateToPay: "",
      maxDateToPay: "",
      category: SPENTS_CATEGORIES.FixRent,
      paymentType: TYPEOFPAYMENTS.Monthly,
      amountLimit: 0
    }
  }
  componentWillMount(){

  }
  handleSave = async ()=>{
    await this.props.actions.createNewAccount({
      id: this.state.id,
      title: this.state.title,
      description: this.state.description,
      amount: this.state.amount,
      uniquePayement: this.state.uniquePayement,
      dayOfMothToPay: this.state.dayOfMothToPay,
      maxDayOfMothToPay: this.state.maxDayOfMothToPay,
      customDateToPay: this.state.customDateToPay,
      maxDateToPay: this.state.maxDateToPay,
      category: this.state.category,
      paymentType: this.state.paymentType,
      amountLimit: this.state.amountLimit,
    });
    this.props.actions.goTo(PAGES.dashboard);
    //we could go dirrectly to the new Item Value /account detail
  };
  resetItemState = ()=>{
    this.setState({
      id: 0,
      title:"",/* account title */
      description: "",
      amount: 0,
      uniquePayement: false,
      dayOfMothToPay: 0,
      maxDayOfMothToPay: 0,
      customDateToPay: "",
      maxDateToPay: "",
      category: SPENTS_CATEGORIES.FixRent,
      paymentType: TYPEOFPAYMENTS.Monthly,
      amountLimit: 0
    });
  };
  handleCancel = ()=>{
    this.props.actions.goTo(PAGES.dashboard);
  };
  handleTest = ()=>{
    this.setState({
      id: 0,
      title:"Plan Claro Test",/* account title */
      description: "Testing Plan Claro",
      amount: 600,
      uniquePayement: false,
      dayOfMothToPay: 15,
      maxDayOfMothToPay: 28,
      customDateToPay: "",
      maxDateToPay: "",
      category: SPENTS_CATEGORIES.FixRent,
      paymentType: TYPEOFPAYMENTS.Monthly,
      amountLimit: 0
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Title 
          text="New Acount Creation"
        />
        <ScrollView>

          <TextInput
            style={styles.inputTitle} 
            placeholder="Acount title"
            onChangeText={ text => (this.setState({title:text})) }
            value={this.state.title}
          />
          
          <TextInput
            style={styles.inputTitle} 
            placeholder="Description"
            onChangeText={(text)=>{this.setState({description:text})}}
              value={this.state.description}
          />
          
          <TextInput
            style={styles.inputTitle} 
            placeholder="Amount"
            onChangeText={amount=>{this.setState({amount:parseFloat(amount)})}}
            value={this.state.amount.toString()}
          />

          <TextInput
            style={styles.inputTitle} 
            placeholder="uniquePayement"
            onChangeText={text=>{this.setState({uniquePayement:text === "true"})}}
            value={this.state.uniquePayement.toString()}
          />

          <TextInput
            style={styles.inputTitle} 
            placeholder="dayOfMothToPay"
            onChangeText={text=>{this.setState({dayOfMothToPay:parseInt(text)})}}
            value={this.state.dayOfMothToPay.toString()}
          />

          <TextInput
            style={styles.inputTitle} 
            placeholder="maxDayOfMothToPay"
            onChangeText={text=>{this.setState({maxDayOfMothToPay:parseInt(text)})}}
            value={this.state.maxDayOfMothToPay.toString()}
          />

          <TextInput
            style={styles.inputTitle} 
            placeholder="customDateToPay"
            onChangeText={text=>{this.setState({customDateToPay:text})}}
            value={this.state.customDateToPay}
          />

          <TextInput
            style={styles.inputTitle} 
            placeholder="maxDateToPay"
            onChangeText={text=>{this.setState({maxDateToPay:text})}}
            value={this.state.maxDateToPay}
          />

          <TextInput
            style={styles.inputTitle} 
            placeholder="category"
            onChangeText={text=>{this.setState({category:parseIng(text)})}}
            value={this.state.category.toString()}
          />
          
          <TextInput
            style={styles.inputTitle} 
            placeholder="paymentType"
            onChangeText={text=>{this.setState({paymentType:parseInt(text)})}}
            value={this.state.paymentType.toString()}
          />

          <TextInput
            style={styles.inputTitle} 
            placeholder="amountLimit"
            onChangeText={text=>{this.setState({amountLimit:parseFloat(text)})}}
            value={this.state.amountLimit.toString()}
          />
        </ScrollView>
        <View style={styles.actionContainer}>
          <Button
            style={styles.actionBtns}
            title="Save"
            onPress={this.handleSave}
          />
          <Button
            style={styles.actionBtns}
            title="Cancel"
            onPress={this.handleCancel}
          />
          <Button
            style={styles.actionBtns}
            title="Test"
            onPress={this.handleTest}
          />
        </View>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
    width: '100%',
    height: '100%',
  },
  actionContainer: {
    // flex:1,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  inputTitle:{
    color: "#fff",
    fontSize: 20
  },
  actionBtns: {
    height: 20,
    margin: 5
  },
});


function mapStateToProps (state) {
  return {
    states: {
      currentView: state.accountStates.currentView,
    }
  }
};

function mapDispatchToProps (dispatch) {
  return {
    actions:{
      goTo: (page) => dispatch(changeCurrentView(page)),
      createNewAccount: (account) => dispatch(createNewAccount(account))
    },
  }
};
//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(NewItem);
