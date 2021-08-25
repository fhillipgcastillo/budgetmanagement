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
} from "native-base";
import { connect } from "react-redux";
import { syncPaymentsState } from "../actions";
import { NAVIGATION_SCREENS } from "../constants";

const PaymentsScreen = (props) => {
  useEffect(() => {
    props.actions.syncPayments();
  }, []);
  const handleAdd = () => {
    props.navigation.navigate(NAVIGATION_SCREENS.MakeAPay, {
      account: {},
    });
  };
  const handleShowDetails = (payment) => {
    props.navigation.navigate(NAVIGATION_SCREENS.ShowPaymentInfo, {
      payment,
    });
  };
  return (
    <Container>
      <Content padder>
        <View style={{ display: "flex", flexDirection: "row", flex: 1 }}>
          <H2 padder>Payments History</H2>
          <Right>
            <Button rounded onPress={handleAdd}>
              <Icon name="add-circle-outline" />
            </Button>
          </Right>
        </View>
        <Container>
          {props.states.payments && props.states.payments.map((p) => (
            <TouchableHighlight
              key={p.id}
              onPress={() => handleShowDetails(p)}
            >
              <Card>
                <CardItem style={{ marginBottom: 10 }}>
                  <Icon name="information-circle-outline" />
                  <Body>
                    <Text>Pago {p.account}</Text>
                    <Text>
                      ${p.amount} {p.currency}
                    </Text>
                    <Text style={{ color: "gray" }}>
                      {new Date(p.date).toLocaleString()}
                    </Text>
                  </Body>
                  {/* <Icon name="arrow-forward" disabled /> */}
                  {/* <Right>
                  <Icon name="arrow-forward" disabled />
                </Right> */}
                </CardItem>
              </Card>
            </TouchableHighlight>
          ))}
        </Container>
      </Content>
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    states: {
      payments: state.paymentsStates.payments,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      syncPayments: () => dispatch(syncPaymentsState()),
    },
  };
}

//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(PaymentsScreen);
