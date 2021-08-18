import React, { Component, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableHighlight,
} from "react-native";
import {
  Container,
  Content,
  Card,
  CardItem,
  Body,
  Icon,
  Right,
  H1,
  H2,
  Button,
  Form,
  Item,
  Label,
  Input,
  Picker,
} from "native-base";
import { connect } from "react-redux";
import { getPayment } from "../actions";
import { getCategory, getPaymentType } from "../constants";
import AccountDetails, { AccontDetailsCp } from "./AccountDetails";
import { Colors } from "react-native/Libraries/NewAppScreen";

const AddPaymentsScreen = (props) => {
  const [account, setAccount] = useState({});
  useEffect(() => {
    // setAccount(props.navigation.getParam("account"));
    let paramAccount = props.navigation.getParam("account");
    console.log("account to pay", paramAccount);
    setAccount(paramAccount);
  }, []);
  return (
    <Container style={{ backgroundColor: "#2c3e50" }}>
      <Content padder>
        <View style={{ flexDirection: "column", flex: 1 }}>
          <H2 padder>Add Payments</H2>
          <Content style={{ flex: 1, alignContent: "center" }}>
            <Form>
              {account ? (
                <AccontDetailsCp account={account} />
              ) : (
                <React.Fragment>
                  <Item floatingLabel>
                    <Label>Account</Label>
                    <Picker
                      note
                      mode="dropdown"
                      style={{ width: 120 }}
                      // selectedValue={this.state.selected}
                      // onValueChange={this.onValueChange.bind(this)}
                    >
                      <Picker.Item label="Wallet" value="key0" />
                      <Picker.Item label="ATM Card" value="key1" />
                      <Picker.Item label="Debit Card" value="key2" />
                      <Picker.Item label="Credit Card" value="key3" />
                      <Picker.Item label="Net Banking" value="key4" />
                    </Picker>
                    <Label>(optional)</Label>
                  </Item>
                  <Item floatingLabel>
                    <Label>Title</Label>
                    <Input />
                  </Item>
                </React.Fragment>
              )}
            </Form>
          </Content>
        </View>
      </Content>
    </Container>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50",
  },
  title: {
    fontSize: 28,
    color: "#fff",
  },
  detail: {
    fontSize: 18,
    color: "#fff",
  },
  inlineDetails: {
    flexDirection: "row",
    color: "white",
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
    marginTop: 15,
  },
  actionBtn: {
    height: 20,
    margin: 5,
  },
});

function mapStateToProps(state) {
  return {
    states: { payments: state.paymentsStates.payments },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      syncPayments: () => dispatch(getPayment()),
    },
  };
}

//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(AddPaymentsScreen);
