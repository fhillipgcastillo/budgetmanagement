//import liraries
import React, { Component } from 'react';
import { AsyncStorage, Button, FlatList, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { connect } from 'react-redux';
import { changeAccountDetail, changeCurrentView, getAccounts } from '../actions';
import { PAGES, ACOUNT_MODEL } from '../constants';
import Title from './Title';
import DashboardItem from './dashboardItem';

const budgetKey = "budget_acount";

// create a component
class Dashboard extends Component {
  componentWillMount(){
    this.updateDataFromDB();
  };
  componentDidMount(){
  };
  resetDbData = async () => {
    await AsyncStorage.setItem(budgetKey, JSON.stringify(ACOUNT_MODEL));
  };
  fullDataReset = async () => {
    await AsyncStorage.setItem(budgetKey, JSON.stringify([]));
    this.updateDataFromDB();
  };
  updateDataFromDB = async () => {
    this.props.actions.getAccounts();
  };
  handleCreateNewPress = ()=>{
    this.props.navigation.navigate("NewAccount");
  };
  render() {
    return (
      <View style={styles.container}>
        <Title 
          text="Dashboard"
        />
        <FlatList 
          data={this.props.states.accounts}
          renderItem={({ item }) => <DashboardItem account={item} navigation={this.props.navigation} /> }
          keyExtractor={item => item.id.toString()}
        />
        <View style={styles.actionContainer}>
          <Button 
            style={styles.actionBtn}
            title="New One"
            onPress={this.handleCreateNewPress}
          />
          <Button
            style={styles.actionBtn}
            title="Full data reset"
            onPress={this.fullDataReset}
          />
           <Button
            style={styles.actionBtn}
            title="reset data"
            onPress={this.resetDbData}
          />
        </View>
      </View>
    );
  }
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
    width: "100%",
    height: "100%",
    paddingTop:50,
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
  actionContainer: {
    flex: 1,
    justifyContent: "space-around",
    flexDirection: "row",
    maxHeight: 30,
    marginBottom: 10,
  },
  actionBtn: {
    height: 20,
    margin: 5,
  }
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
      getAccounts: ()=> dispatch(getAccounts(dispatch)),
    },
    goTo: (page) => dispatch(changeCurrentView(page))
  }
};

//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
