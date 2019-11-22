//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
import Dashboard from "./dashboard";
import NewItem from "./newItem";
// emitter.setMaxListener = 2;
const budgetKey = "budget_acount";

const PAGES = {
  dashboard: 0,
  newItem: 1
};

var ACOUNT_MODEL = [
  {
    id: "1",
    title:"Internet Claro Fibra",/* account title */
    description: "",
    amount: 1460,
    uniquePayement: false,
    dayOfMothToPay: 0,
    maxDayOfMothToPay: 0,
    customDateToPay: "",
    maxDateToPay: "11/16/2019",
    category: 1,
    type: 1,
    amountLimit: 0
  },
  {
    id: "2",
    title:"Sonography",/* account title */
    description: "",
    amount: 2600,
    uniquePayement: true,
    dayOfMothToPay: 15,
    maxDayOfMothToPay: 28,
    customDateToPay: "11/13/2019",
    maxDateToPay: "11/16/2019",
    category: 1,
    type: 4, /* paymentType */
    amountLimit: 0
  }
];

// create a component
class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentView: PAGES.dashboard
    };
  };
  componentDidMount(){
    this.constructDB();
  }
  constructDB = async ()=>{
    console.log("construction db...", ACOUNT_MODEL);
    await AsyncStorage.setItem(budgetKey, JSON.stringify(ACOUNT_MODEL));
    console.log("db constructed");

  };
  handleCreation = ()=>{
    console.log("creation");
    this.setState({currentView: PAGES.newItem});
  };
  handleSave = async (data)=>{
    //getting and formating data
    var dbPure = await AsyncStorage.getItem(budgetKey);
    let db = JSON.parse(dbPure);
    console.log("db constructed", db);

    data.id = db.length+1;

    //Adding new value
    db.push(data);
    dbPure = JSON.stringify(db);
    console.log("saving...", data);
    console.log("as...", db);
    //commiting changes
    await AsyncStorage.setItem(budgetKey, dbPure);
    
    this.setState({currentView: PAGES.dashboard});

  };
  handleCancel = ()=>{
    console.log("cancel");
    this.setState({currentView: PAGES.dashboard});
  };
  render() {
    return (
      <View style={styles.container}>
        {this.state.currentView === PAGES.newItem 
        ? <View n-ote="Actions Container">
           <NewItem 
            onSaveClick={this.handleSave}
            onCancelClick={this.handleCancel}
          />
        </View>
        : <Dashboard 
            onCreationClick={this.handleCreation}
          />
        }
      </View>
    );
  }
}

//make this component available to the app
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 15,
    paddingBottom: 15
  },
});
