//import liraries
import React, { Component } from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { connect } from "react-redux";
import { changeAccountDetail, changeCurrentView } from "../actions";
import { PAGES } from "../constants";

const AccountPreviewItem = props => {
  let handleShowDetail = () => {
    props.actions.changeAccountDetail(props.account);
    props.navigation &&
      props.navigation.navigate("AccountDetail", { account: props.account });
  };
  return (
    <TouchableHighlight onPress={handleShowDetail}>
      <View style={styles.itemContainer}>
        <Text>{props.account.title}</Text>
        <Text>${props.account.amount}</Text>
      </View>
    </TouchableHighlight>
  );
};

// define your styles
const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  title: {
    fontSize: 32,
    color: "#fff"
  }
});

function mapStateToProps(state) {
  return {
    states: {
      accounts: state.accountStates.accounts,
      currentView: state.accountStates.currentView,
      accountDetail: state.accountStates.accountDetail,
      DUMMY_DATA: state.accountStates.ACOUNT_MODEL
    }
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      goTo: page => dispatch(changeCurrentView(page)),
      changeAccountDetail: account => dispatch(changeAccountDetail(account))
    }
  };
}

//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(AccountPreviewItem);
