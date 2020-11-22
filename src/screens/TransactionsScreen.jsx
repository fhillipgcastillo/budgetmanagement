import React, { Component } from "react";
import { Body, Button, Card, CardItem, Container, Content, Icon } from "native-base";
import { View, Text } from "react-native";
import { Header } from 'react-native/Libraries/NewAppScreen';

const TransactionScreen = () => {
  return (
    <Container>
        <Header />
        <Content>
            <Button><Icon name="add-circle" /></Button>
            <Card>
                <CardItem header>
                <   Text>NativeBase</Text>
                </CardItem>
                <CardItem>
                    <Body>
                        <Text>
                        text
                        </Text>
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