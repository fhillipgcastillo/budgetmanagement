//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  Switch
} from "react-native";
import Title from "./Title";
import {
  SPENTS_CATEGORIES,
  TYPEOFPAYMENTS,
  PAGES,
  getCategory,
  getPaymentType
} from "../constants";
import { connect } from "react-redux";
import { createNewAccount, changeCurrentView } from "../actions";
import CategorySelect from "./categorySelect";
import PaymentTypeSelect from "./paymentTypeSelect";
import { DatePicker } from "./DatePicker";
import { LabeledFloatInputForm } from "./LabeledFloatInputForm";
import { LabeledIntegerInputForm } from "./LabeledIntegerInputForm";
import { LabeledInputForm } from "./LabeledInputForm";

// create a component
class NewAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      title: "",
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
    };
  }
  componentWillMount() {}
  handleSave = async () => {
    let account = {
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
      amountLimit: this.state.amountLimit
    };
    await this.props.actions.createNewAccount(account);
    this.props.navigation.goBack();
    // if wants to go to the details screen
    // this.props.navigation.navigate("AccountDetail", {account: account});
  };
  resetItemState = () => {
    this.setState({
      id: 0,
      title: "",
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
  handleCancel = () => {
    this.props.navigation.goBack();
  };
  handleTest = () => {
    this.setState({
      id: 0,
      title: "Plan Claro Test",
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
  };
  getCategory = key => {
    return getCategory(key);
  };
  getPaymentType = key => {
    return getPaymentType(key);
  };
  handleSelectedCategoryChange = newValue => {
    this.setState({ category: newValue });
  };
  handleSelectedPaymentTypeChange = newValue => {
    this.setState({ paymentType: newValue });
  };
  fromTextToFloat = text => {
    //validate and extract all not numbers from text
    cleanText = text
      .split("")
      .filter(c => !isNaN(c))
      .join("")
      .trim();
    return parseFloat(cleanText);
  };
  handleAmountLimitChange = text => {
    this.setState({ amountLimit: this.fromTextToFloat(text) });
  };
  render() {
    return (
      <View style={styles.container}>
        <Title text="New Acount Creation" />
        <ScrollView>
          <LabeledInputForm
            title={"Account name"}
            value={this.state.title}
            onChangeText={text => this.setState({ title: text })}
          />

          <LabeledInputForm
            title="Description"
            value={this.state.description}
            onChangeText={text => {
              this.setState({ description: text });
            }}
          />

          <LabeledFloatInputForm
            title="Dept amount"
            value={this.state.amount}
            onChangeText={amount => this.setState({ amount: amount })}
          />

          <View style={styles.LabelInputForm}>
            <Text style={styles.inputTitle}>Unique payment:</Text>
            <Switch
              style={{ color: "white" }}
              onValueChange={text => {
                this.setState({ uniquePayement: text });
              }}
              value={this.state.uniquePayement}
            />
          </View>

          <LabeledIntegerInputForm
            title="Day Of Month to pay"
            value={this.state.dayOfMothToPay}
            onChangeText={dayOfMothToPay =>
              this.setState({ dayOfMothToPay: dayOfMothToPay })
            }
          />

          <LabeledIntegerInputForm
            title="Max day Of Month to pay"
            value={this.state.maxDayOfMothToPay}
            onChangeText={maxDayOfMothToPay =>
              his.setState({ maxDayOfMothToPay: maxDayOfMothToPay })
            }
          />

          <View style={styles.LabelInputForm}>
            <Text style={styles.inputTitle}>customDateToPay: </Text>
            <DatePicker
              date={this.state.customDateToPay}
              style={styles.inputTitle}
              selectTextOnFocus={true}
              changeValue={value => this.setState({ customDateToPay: value })}
            />
          </View>

          <View style={styles.LabelInputForm}>
            <Text style={styles.inputTitle}>Max date to pay: </Text>
            <DatePicker
              date={this.state.maxDateToPay}
              style={styles.inputTitle}
              changeValue={value => this.setState({ maxDateToPay: value })}
            />
          </View>

          <CategorySelect
            category={this.state.category}
            handleSelectedValueChange={this.handleSelectedCategoryChange}
            enabled={true}
          />

          <PaymentTypeSelect
            paymentType={this.state.paymentType}
            handleSelectedValueChange={this.handleSelectedPaymentTypeChange}
            enabled={true}
          />

          <LabeledFloatInputForm
            title="Amount Limit"
            value={this.state.amountLimit}
            onChangeText={amountLimit => this.setState({ amountLimit: amountLimit })}
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
export const styles = StyleSheet.create({
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

function mapStateToProps(state) {
  return {
    states: {
      currentView: state.accountStates.currentView
    }
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      goTo: page => dispatch(changeCurrentView(page)),
      createNewAccount: account => dispatch(createNewAccount(account))
    }
  };
}
//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(NewAccount);
