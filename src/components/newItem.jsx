//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  ScrollView,
  Switch,
  Picker,
  TimePickerAndroid
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
import {
  changeAccountDetail,
  createNewAccount,
  changeCurrentView
} from "../actions";
import CategorySelect from "./categorySelect";
import PaymentTypeSelect from "./paymentTypeSelect";

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
      amountLimit: this.state.amountLimit
    });
    this.props.actions.goTo(PAGES.dashboard);
    //we could go dirrectly to the new Item Value /account detail
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
    this.props.actions.goTo(PAGES.dashboard);
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
          <View style={styles.LabelInputForm}>
            <Text style={styles.inputTitle}>Title: </Text>
            <TextInput
              style={styles.inputTitle}
              placeholder="Acount title"
              onChangeText={text => this.setState({ title: text })}
              value={this.state.title}
            />
          </View>
          <View style={styles.LabelInputForm}>
            <Text style={styles.inputTitle}>Description: </Text>
            <TextInput
              style={styles.inputTitle}
              placeholder="Description"
              onChangeText={text => {
                this.setState({ description: text });
              }}
              value={this.state.description}
            />
          </View>
          <View style={styles.LabelInputForm}>
            <Text style={styles.inputTitle}>Amount: </Text>
            <TextInput
              style={styles.inputTitle}
              placeholder="Amount"
              onChangeText={amount => {
                this.setState({ amount: parseFloat(amount) });
              }}
              value={this.state.amount.toString()}
            />
          </View>
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
          <View style={styles.LabelInputForm}>
            <Text style={styles.inputTitle}>Day Of MothT o Pay: </Text>
            <TextInput
              style={styles.inputTitle}
              placeholder="dayOfMothToPay"
              onChangeText={text => {
                this.setState({ dayOfMothToPay: parseInt(text) });
              }}
              value={this.state.dayOfMothToPay.toString()}
            />
          </View>
          <View style={styles.LabelInputForm}>
            <Text style={styles.inputTitle}>Max Day Of Moth ToP ay: </Text>
            <TextInput
              style={styles.inputTitle}
              placeholder="maxDayOfMothToPay"
              onChangeText={text => {
                this.setState({ maxDayOfMothToPay: parseInt(text) });
              }}
              value={this.state.maxDayOfMothToPay.toString()}
            />
          </View>
          <View style={styles.LabelInputForm}>
            <Text style={styles.inputTitle}>customDateToPay: </Text>
            <TextInput
              style={styles.inputTitle}
              placeholder="customDateToPay"
              onChangeText={text => {
                this.setState({ customDateToPay: text });
              }}
              value={this.state.customDateToPay}
            />
          </View>
          <View style={styles.LabelInputForm}>
            <Text style={styles.inputTitle}>Max date to pay:</Text>
            <TextInput
              style={styles.inputTitle}
              placeholder="maxDateToPay"
              onChangeText={text => {
                this.setState({ maxDateToPay: text });
              }}
              value={this.state.maxDateToPay}
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
          <TextInput
            style={styles.inputTitle}
            placeholder="amountLimit"
            selectTextOnFocus={true}
            onChangeText={this.handleAmountLimitChange}
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
export default connect(mapStateToProps, mapDispatchToProps)(NewItem);
