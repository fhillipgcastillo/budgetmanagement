//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// remove asyncstorange from here and use api db and redux workflow
import { connect } from 'react-redux';
import Dashboard from "./ManageAccounts";
import NewAccount from "./NewAccount";
import AccountDetail from './AccountPreviewItem';
import {PAGES, DBKEY, ACOUNT_MODEL } from '../constants';
import { changeAccountDetail, changeCurrentView} from '../actions'

// create a component
class App extends Component {
  componentWillMount(){
    this.setState({...this.props.states});
  };
  componentDidMount(){
    this.constructDB();
  }
  constructDB = async ()=>{
    // console.log("construction db...");
    var dbPure = await AsyncStorage.getItem(DBKEY);
    let db = JSON.parse(dbPure);
    // console.log("DB", db);
    if(db !== null && db.length <= 0){
      await AsyncStorage.setItem(DBKEY, JSON.stringify(ACOUNT_MODEL));
      // console.log("db constructed");
    }
  };
  handleCreation = ()=>{
    this.setState({currentView: PAGES.newItem});
  };
  handleSave = async (data)=>{
    //getting and formating data
    var dbPure = await AsyncStorage.getItem(DBKEY);
    let db = JSON.parse(dbPure);
    // console.log("db constructed", db);

    data.id = db.length+1;

    //Adding new value
    db.push(data);
    dbPure = JSON.stringify(db);
    // console.log("saving...", data);
    // console.log("as...", db);
    //commiting changes
    await AsyncStorage.setItem(DBKEY, dbPure);
    
    this.setState({currentView: PAGES.dashboard});

  };
  handleCancel = ()=>{
    this.setState({currentView: PAGES.dashboard});
  };
  handleShowDetail = (detail)=>{
    // this.setState({
    //   currentView: PAGES.detail,
    //   accountDetail: detail
    // });
    // this.props.accountDetail = detail;
    this.props.changeAccountDetail(detail);
    this.props.goTo(PAGES.detail);
    // this.setState({currentView: PAGES.detail});
  };
  handleBack = ()=>{
    this.setState({
      currentView: PAGES.dashboard,
      accountDetail: {}
    });
    this.props.goTo(PAGES.dashboard);
  };
  render() {
    // const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
         {/* <StatusBar hidden={true}/>  */}
         <ScrollView style={{flex:8, flexBasis: "80%"}}>
          {  this.props.states.currentView === PAGES.dashboard
          ? <Dashboard 
              onCreationClick={this.handleCreation}
              showDetail={this.handleShowDetail}
              handleBack={this.handleBack}
            />
          : this.props.states.currentView === PAGES.newItem 
          ? 
          <NewAccount 
            onSaveClick={this.handleSave}
            onCancelClick={this.handleCancel}
          />
          
          : this.props.states.currentView === PAGES.detail
          ? <AccountDetail style={{flex:8}} {...this.props.states.accountDetail} />
          : <Text>Current View {this.props.states.currentView}</Text>
          }
        </ScrollView>
        {/* <ScrollView style={{flex:2, flexBasis: "20%", alignSelf: "flex-end"}}>
          <Text>Props: {JSON.stringify(this.props)}</Text>
        </ScrollView> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50'
  },
});

function mapStateToProps (state) {
  return {
    states : {
      accounts: state.accountStates.accounts,
      currentView: state.accountStates.currentView,
      accountDetail: state.accountStates.accountDetail,
      DUMMY_DATA:  state.accountStates.ACOUNT_MODEL
    }
  }
};

function mapDispatchToProps (dispatch) {
  return {
    // actions: {
    //   ...
    // },
    goTo: (page) => dispatch(changeCurrentView(page)),
    changeAccountDetail: account => dispatch(changeAccountDetail(account))
  }
}

//make this component available to the app
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

