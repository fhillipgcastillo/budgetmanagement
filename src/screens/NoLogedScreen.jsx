//import liraries
import { Container, Content, Form, Input, Item, Label } from "native-base";
import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { Header } from "react-native/Libraries/NewAppScreen";

class NoLogedScreen extends Component {
  
  changeScreen=(screenName)=>{
    console.log("changing screen", screenName);
    this.props.navigation.navigate(screenName);
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Header />
        <Content>
          <Form style={styles.container}>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input />
            </Item>
            <Button title="Log in" onPress={() => this.changeScreen("Dashboard")} />
          </Form>
        </Content>
      </Container>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    padding: 10
  }
});

//make this component available to the app
export default NoLogedScreen;
