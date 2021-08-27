//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import Button from './Button'
import {
  SPENTS_CATEGORIES,
  TYPEOFPAYMENTS,
  PAGES,
  getCategory,
  getPaymentType
} from "../constants";
import { connect } from "react-redux";
import {
  createNewAccount,
  changeCurrentView,
  updateAccount,
  changeAccountDetail
} from "../actions";
import CategorySelect from "./CategorySelect";
import PaymentTypeSelect from "./PaymentTypeSelect";
import DatePicker from "./DatePicker";
import LabeledFloatInputForm from "./LabeledFloatInputForm";
import LabeledIntegerInputForm from "./LabeledIntegerInputForm";
import LabeledInputForm  from "./LabeledInputForm";

// create a component
class NewAccount extends Component {
  static navigationOptions = ({ navigation }) => ({
    title:
      navigation.state.params && navigation.state.params.editMode
        ? `Edit Account`
        : "New Account"
  });
  constructor(props) {
    super(props);
    let isEditMode = this.props.navigation.getParam("editMode");
    let account = this.props.navigation.getParam("account");

    // this.navigationOptions.title = isEditMode ? `Modifying ${account.title}` : "Create new Account";

    this.state = {
      id: isEditMode ? account.id : 0,
      title: isEditMode ? account.title : "",
      description: isEditMode ? account.description : "",
      amount: isEditMode ? account.amount : 0,
      uniquePayement: isEditMode ? account.uniquePayement : false,
      dayOfMothToPay: isEditMode ? account.dayOfMothToPay : 0,
      maxDayOfMothToPay: isEditMode ? account.maxDayOfMothToPay : 0,
      customDateToPay: isEditMode ? account.customDateToPay : "",
      maxDateToPay: isEditMode ? account.maxDateToPay : "",
      category: isEditMode ? account.category : SPENTS_CATEGORIES.FixRent,
      paymentType: isEditMode ? account.paymentType : TYPEOFPAYMENTS.Monthly,
      amountLimit: isEditMode ? account.amountLimit : 0,
      isEditMode: isEditMode || false
    };
  }

  componentDidMount() {}
  handleSave = () => {
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

    if (this.state.isEditMode && account.id > 0) {
      this.update(account);
    } else {
      this.save(account);
    }
    // if wants to go to the details screen
    // this.props.navigation.navigate("AccountDetail", {account: account});
  };
  save = async account => {
    await this.props.actions.createNewAccount(account);
    this.props.navigation.goBack();
  };
  update = async account => {
    this.props.actions.updateAccount(account).then(res => {
      res.data && this.props.actions.changeAccountDetail(res.data);
      this.props.navigation.state.params.refleshAccount && this.props.navigation.state.params.refleshAccount(res.data);
      this.props.navigation.goBack();
    });
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
        <ScrollView>
          <LabeledInputForm
            title="Account name"
            value={this.state.title}
            onChangeText={text => this.setState({ title: text })}
            placeholder="Add an account name"
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

          {this.state.paymentType !== TYPEOFPAYMENTS.Unique ? (
            <React.Fragment>
              <LabeledFloatInputForm
                title="Amount Limit"
                value={this.state.amountLimit}
                onChangeText={amountLimit =>
                  this.setState({ amountLimit: amountLimit })
                }
              />
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
                  this.setState({ maxDayOfMothToPay: maxDayOfMothToPay })
                }
              />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <View style={styles.LabelInputForm}>
                <Text style={styles.inputTitle}>customDateToPay: </Text>
                <DatePicker
                  date={this.state.customDateToPay}
                  selectTextOnFocus={true}
                  changeValue={value =>
                    this.setState({ customDateToPay: value })
                  }
                />
              </View>

              <View style={styles.LabelInputForm}>
                <Text style={styles.inputTitle}>Max date to pay: </Text>
                <DatePicker
                  date={this.state.maxDateToPay}
                  changeValue={value => this.setState({ maxDateToPay: value })}
                />
              </View>
            </React.Fragment>
          )}
        </ScrollView>
        <View style={styles.actionContainer}>
          <Button
            title="Save"
            onPress={this.handleSave}
          />
          <Button
            title="Cancel"
            onPress={this.handleCancel}
          />
          <Button
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
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    marginBottom: 10,
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  inputTitle: {
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
      createNewAccount: account => dispatch(createNewAccount(account)),
      updateAccount: account => dispatch(updateAccount(account)),
      changeAccountDetail: account => dispatch(changeAccountDetail(account))
    }
  };
}
//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(NewAccount);
