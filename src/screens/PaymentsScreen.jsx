import React, { Component, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
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
} from "native-base";
import { connect } from "react-redux";
import { getPayment } from "../actions";

const PaymentsScreen = (props) => {
  useEffect(() => {
    props.actions.syncPayments();
    console.log("Payments render", props.states);
  }, []);

  return (
    <Container>
      <Content padder>
        <H2>Payments History</H2>
        <Container>
          <Card>
            {
              props.states.payments.map( p => (
                <CardItem button key={p.id}>
                  <Icon name="information-circle-outline" />
                  <Body>
                    <Text>Pago {p.account}</Text>
                    <Text>${p.amount} {p.currency}</Text>
                  </Body>
                  <Right>
                    <Icon name="arrow-forward" disabled />
                  </Right>
                </CardItem>
              ))
            }
          </Card>
        </Container>
      </Content>
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    states: {payments: state.paymentsStates.payments}
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      syncPayments: () => dispatch(getPayment())
    }
  };
}

//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(PaymentsScreen);
