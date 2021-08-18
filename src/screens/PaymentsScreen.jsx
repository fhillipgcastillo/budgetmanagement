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
import { getPayment } from "../actions";
import { NAVIGATION_SCREENS } from "../constants";

const PaymentsScreen = (props) => {
  useEffect(() => {
    props.actions.syncPayments();
  }, []);
  const handleAdd = () => {
    props.navigation.navigate(NAVIGATION_SCREENS.MakeAPay, {
      // account: this.props.navigation.getParam("account"),
    });
  }
  return (
    <Container>
      <Content padder>
        <View style={{display: "flex", flexDirection:"row", flex: 1}}>
          <H2 padder>Payments History</H2>
          <Right>
            <Button rounded onPress={handleAdd}><Icon name="add-circle-outline" /></Button>
          </Right>
        </View>
        <Container>
          {props.states.payments.map((p) => (
            <Card>
              <CardItem button key={p.id} style={{ marginBottom: 10 }}>
                <Icon name="information-circle-outline" />
                <Body>
                  <Text>Pago {p.account}</Text>
                  <Text>
                    ${p.amount} {p.currency}
                  </Text>
                </Body>
                <Right>
                  <Icon name="arrow-forward" disabled />
                </Right>
              </CardItem>
            </Card>
          ))}
        </Container>
      </Content>
    </Container>
  );
};

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
export default connect(mapStateToProps, mapDispatchToProps)(PaymentsScreen);
