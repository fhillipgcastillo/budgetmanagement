//import liraries
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { connect } from 'react-redux';
import { changeAccountDetail, changeCurrentView } from '../actions';
import { PAGES } from '../constants';

const DashboardItem = (props) => {
  let handleShowDetail = ()=>{
    props.actions.changeAccountDetail(props.account);
    props.actions.goTo(PAGES.detail);
  };
  return (
    <View style={styles.item}>
      <TouchableHighlight  onPress={handleShowDetail}>
        <Text>{props.account.title}</Text>
      </TouchableHighlight>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  item:{
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title:{
    fontSize: 32,
    color: "#fff"
  },
});

function mapStateToProps (state) {
  return {
    states: {
      accounts: state.accountStates.accounts,
      currentView: state.accountStates.currentView,
      accountDetail: state.accountStates.accountDetail,
      DUMMY_DATA:  state.accountStates.ACOUNT_MODEL
    }
  }
};

function mapDispatchToProps (dispatch) {
  return {
    actions:{
      goTo: (page) => dispatch(changeCurrentView(page)),
      changeAccountDetail: account => dispatch(changeAccountDetail(account)),
    },
  }
};

//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(DashboardItem);
