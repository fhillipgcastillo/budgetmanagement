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
import { getAccounts, getPayment } from "../actions";
import { getCategory, getPaymentType } from "../constants";
import AccountDetails, { AccontDetailsCp } from "./AccountDetails";
import { Colors } from "react-native/Libraries/NewAppScreen";

const AddPaymentsScreen = (props) => {
  const [account, setAccount] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState("key0");
  useEffect(() => {
    let paramAccount = props.navigation.getParam("account");

    paramAccount && setAccount(paramAccount);
    // sync accounts list
    props.actions.getAccounts();

    !paramAccount && props.actions.getAccounts();
  }, []);

  useEffect(() => {
    let accountFound = props.states.accounts.find(
      (ac) => ac.id === selectedAccount
    );
    if (accountFound) setAccount(accountFound);
  }, [selectedAccount]);

  const handleSelectedAccountChange = (newSelectedAccount) =>
    setSelectedAccount(newSelectedAccount);

  return (
    <Container style={{ backgroundColor: "#2c3e50" }}>
      <Content padder>
        <View style={{ flexDirection: "column", flex: 1 }}>
          <H2 padder>Add Payments</H2>
          <Content
            style={{ flex: 1, alignContent: "center", flexBasis: "100%" }}
          >
            <Form>
              <Label>Account</Label>
              <Picker
                note
                mode="dropdown"
                style={{ width: 120, flex: 1, minWidth: 200, minHeight: 50 }}
                selectedValue={selectedAccount}
                onValueChange={handleSelectedAccountChange.bind(this)}
              >
                {props.states.accounts &&
                  props.states.accounts.map((acc) => (
                    <Picker.Item label={acc.title} value={acc.id} />
                  ))}
              </Picker>

              {account && selectedAccount && (
                <AccontDetailsCp account={account} />
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
    states: {
      payments: state.paymentsStates.payments,
      accounts: state.accountStates.accounts,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      syncPayments: () => dispatch(getPayment()),
      getAccounts: () => dispatch(getAccounts(dispatch)),
    },
  };
}

//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(AddPaymentsScreen);
