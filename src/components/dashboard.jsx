//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet , FlatList, Button, AsyncStorage, TouchableHighlight} from 'react-native';
import Title from './Title';
import {ACOUNT_MODEL, TYPEOFPAYMENTS, SPENTS_CATEGORIES} from '../models/acount_data';

const budgetKey = "budget_acount";

const Item = (props) => {
  let handleShowDetail = ()=>{
    console.log("show detail", props);
    // props.showDetail(props.account)
  }
  return (
    <View style={styles.item}>
      <TouchableHighlight  onPress={handleShowDetail}>
        <Text>{props.account.title}</Text>
      </TouchableHighlight>
    </View>
  );
};

// create a component
class Dashboard extends Component {
  constructor(props){
    super(props);

    this.state = {
      Acounts: [],
      updateIndID: null
    }
  };
  componentDidMount(){
    //getting and formating data
    // let intervalIdentifier = setInterval(()=>{
      console.log("Updating list...");
      this.updateDataFromDB();
      console.log("List Updated");
    // }, 10000);

    // this.setState({updateIndID: intervalIdentifier});
  };
  resetDbData = async () => {
    await AsyncStorage.setItem(budgetKey, JSON.stringify(ACOUNT_MODEL));
    console.log("data reseted");
  };
  updateDataFromDB = async () => {
    console.log("retrieving the data");
    let dbPure = await AsyncStorage.getItem(budgetKey);
    console.log("god pured data", dbPure);
    let db = JSON.parse(dbPure);
  
    this.setState({Acounts: db});
    console.log("new data", db);
    // if(this.state.updateIndID)
  };
  
  render() {
    return (
      <View style={styles.container}>
        <Title 
          text="Dashboard"
        />
        <FlatList 
          data={this.state.Acounts}
          renderItem={({ item }) => <Item account={item} showDetail={this.props.showDetail} goBack={this.props.handleBack}/> }
          keyExtractor={item=>item.id}
        />
        <View style={styles.actionContainer}>
          <Button 
            style={styles.actionBtn}
            title="New One"
            onPress={this.props.onCreationClick}
          />
          <Button
            style={styles.actionBtn}
            title="Update data"
            onPress={this.updateDataFromDB}
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

//make this component available to the app
export default Dashboard;
