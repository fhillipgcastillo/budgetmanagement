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
import { syncAccounts, getPayment, createPayment } from "../actions";
import AccountDetails, { AccontDetailsCp } from "./AccountDetailsScreen";

const AddPaymentsScreen = (props) => {
  const [account, setAccount] = useState(null);
  const [payment, setPayment] = useState({});
  const [selectedAccount, setSelectedAccount] = useState("key0");
  
  useEffect(() => {
    let paramAccount = props.navigation.getParam("account");

    paramAccount && setAccount(paramAccount);
    props.actions.syncAccounts();

    !paramAccount && props.actions.getAccounts();
  }, []);

  useEffect(() => {
    let accountFound = props.states.accounts.find(
      (ac) => ac.id === selectedAccount
    );
    if (accountFound) {
      const data = {
        accountId: accountFound.id,
        account: accountFound.title,
        amount: accountFound.amount,
        curency: "dop",
        date: undefined
      };
      setAccount(accountFound)
      setPayment(data);
    };
  }, [selectedAccount]);

  const handleSelectedAccountChange = (newSelectedAccount) =>
    setSelectedAccount(newSelectedAccount);

  const handlePayment = ()=>{
    props.actions.createPayment({
      ...payment,
      date: new Date().toString()
    })
    .then(() => {
      props.navigation.goBack();
    });
  };

  return (
    <Container style={{ backgroundColor: "#2c3e50" }}>
      <Content padder>
        <View style={{ flexDirection: "column", flex: 1 }}>
          <H2 padder>Add Payments</H2>
          <Content
            style={{ flex: 1, alignContent: "center", flexBasis: "100%" }}
          >
            <Form>
               <Item>
              <Label>Accounts</Label>
              <Picker
                note
                mode="dropdown"
                style={{ width: 120, flex: 1, minWidth: 200, minHeight: 50 }}
                selectedValue={selectedAccount}
                onValueChange={handleSelectedAccountChange.bind(this)}
              >
                {props.states.accounts &&
                  props.states.accounts.map((acc) => (
                    <Picker.Item key={acc.id} label={acc.title} value={acc.id} />
                  ))}
              </Picker>
              </Item>

              {account && selectedAccount && (
                <>
                  <AccontDetailsCp account={account} />
                  <View>
                    <Button
                      style={styles.actionBtn}
                      primary
                      onPress={handlePayment}
                    >
                      <Text>Make payment</Text>
                    </Button>
                  </View>
                </>
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
  },
  title: {
    fontSize: 28,
    color: "#000",
  },
  detail: {
    fontSize: 18,
    color: "#000",
  },
  inlineDetails: {
    flexDirection: "row",
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
    minHeight: 20,
    margin: 5,
    padding: 10
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
      syncAccounts: () => dispatch(syncAccounts()),
      createPayment: payment => dispatch(createPayment(payment))
    },
  };
}

//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(AddPaymentsScreen);
