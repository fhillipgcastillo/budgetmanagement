//import liraries
import { Container, Content, Form, Input, Item } from "native-base";
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
            <Item>
              <Input placeholder="Username" />
            </Item>
            <Item last>
              <Input placeholder="Password" />
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
    alignContent: "center"
  }
});

//make this component available to the app
export default NoLogedScreen;
