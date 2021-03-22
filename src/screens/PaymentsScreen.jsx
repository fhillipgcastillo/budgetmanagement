import React, { Component, useState } from "react";
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

const PaymentsScreen = () => {
  const [payments, setPayments] = useState([
    {
      id: 1,
      date: "03/21/2021",
      accountId: 1,
      account: "Apartamento",
      amount: 9000,
      currency: "DOP"
    },
    {
      id: 2,
      date: "03/21/2021",
      accountId: 1,
      account: "Apartamento",
      amount: 9000,
      currency: "DOP"
    }
  ]);
  return (
    <Container>
      <Content padder>
        <H2>Payments History</H2>
        <Container>
          <Card>
            {
              payments.map( p => (
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
    // states: {accountDetail:state.accountDetail}
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(PaymentsScreen);
