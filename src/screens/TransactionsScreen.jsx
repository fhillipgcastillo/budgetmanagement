import React, { Component } from "react";
import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Icon,
} from "native-base";
import { View, Text } from "react-native";
import { Header } from "react-native/Libraries/NewAppScreen";
import { NAVIGATION_SCREENS } from "../constants";

const TransactionScreen = (props) => {
  const handleAddTransactionPress = () => {
    props.navigation.navigate(NAVIGATION_SCREENS.AddTransaction);
  };
  return (
    <Container>
      <Header />
      <Content>
        <Button onPress={handleAddTransactionPress}>
          <Icon name="add-circle" />
        </Button>
        <Card>
          <CardItem header>
            <Text>NativeBase</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text>text</Text>
            </Body>
          </CardItem>
          <CardItem footer>
            <Text>GeekyAnts</Text>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

export default TransactionScreen;
