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
import AccountDetails, { AccontDetailsCp } from "./AccountDetails";

const AddPaymentsScreen = (props) => {
  const [account, setAccount] = useState(null);
  const [payment, setPayment] = useState({});
  
  useEffect(() => {
    let paramPayment = props.navigation.getParam("payment");
    props.actions.syncAccounts();
    if(paramPayment) {
      setPayment(paramPayment);
      const accountExist = props.states.accounts.find(a => a.id === paramPayment.accountId);
    if(accountExist) setAccount(accountExist);
    }
    
  }, [props.states.accounts]);

  const handlePayment = ()=>{
    props.actions.createPayment({
      ...payment,
      date: new Date().toString()
    })
    .then(() => {
      props.navigation.goBack();
    });
  };

  const handleDeletePayment = ()=>{
    // props.actions
  }
  return (
    <Container style={{ backgroundColor: "#2c3e50" }}>
      <Content padder>
        <View style={{ flexDirection: "column", flex: 1 }}>
          <H2 padder>Payments</H2>
          <Content
            style={{ flex: 1, alignContent: "center", flexBasis: "100%" }}
          >
            {/* <H3 padder>{payment.title}</H3> */}
            {account && (
                <>
                  <AccontDetailsCp account={account} />
                  <View>
                    <Button
                      style={styles.actionBtn}
                      primary
                      onPress={handleDeletePayment}
                    >
                      <Text>Delete</Text>
                    </Button>
                  </View>
                </>
              )}
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
