//import liraries
import React, { Component } from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { Icon, ListItem } from "react-native-elements";
import { connect } from "react-redux";
import { changeAccountDetail, changeCurrentView } from "../actions";
import { PAGES } from "../constants";

const AccountPreviewItem = props => {
  let handleShowDetail = () => {
    props.actions.changeAccountDetail(props.account);
    props.navigation &&
      props.navigation.navigate("AccountDetail", { account: props.account });
  };
  let bg = "#ff6c6c";
  if(props.type){
    if(props.type === "current" ){
      bg = "#1db91d" 
    } else if(props.type === "next" ){
      bg = "#4691df"
    } 
  }
    
  const _style = {};
  for (key in styles.itemContainer) {
    _style[key] = styles.itemContainer[key];
  }
  _style.backgroundColor = bg;
  return (
    <TouchableHighlight onPress={handleShowDetail}>
      <ListItem key={props.key} bottomDivider>
        <Icon name={'av-timer'} />
        <ListItem.Content>
          <ListItem.Title>{props.account.title}</ListItem.Title>
          <ListItem.Subtitle style>${props.account.amount}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
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
    justifyContent: "space-between",
    borderRadius: 30,
  },
  itemTitle: {
    fontSize: 18,
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
