import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";

class BaseComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Text> BaseComponent </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
});

function mapStateToProps(state) {
  return {
    states: {
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
    },
  };
}

//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(BaseComponent);