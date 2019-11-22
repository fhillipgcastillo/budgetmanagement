//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet , FlatList, Button, AsyncStorage} from 'react-native';
import Title from './Title';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d73',
    title: 'Fourth Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d74',
    title: 'Fifth Item',
  },
];

const budgetKey = "budget_acount";

const TYPEOFPAYMENTS = {
  Monthly: 1,
  Unique: 2,
  Quaterly: 3,
  Custom : 0, /* OPTIONAL or Nice to have */
};

const SPENTS_CATEGORIES = {
  FixRent: 1,
  TransportSpences: 2,
  Utilities: 3,
  Food: 4,
  Dept: 5,
  Entertainment: 6,
  Pregnancy: 7
};

/* 
  When TYPEOFPAYMENTS is UniquePayment
    requires maxDayToPay
    dayOfMothToPay and maxDayOfMothToPay are optionals
      or could be auto setup by maxDayToPay
  When TYPEOFPAYMENTS is Montly

*/

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
    category: SPENTS_CATEGORIES.FixRent,
    type: TYPEOFPAYMENTS.MonthlyPayment,
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
    category: SPENTS_CATEGORIES.FixRent,
    type: TYPEOFPAYMENTS.UniquePayment, /* paymentType */
    amountLimit: 0
  }
];

const Item = ({title}) => {
  return (
    <View style={styles.item}>
      <Text>{title}</Text>
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
  componentWillUnmount(){
    clearInterval(this.state.updateIndID); 
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
          renderItem={({ item }) => <Item title={item.title} /> }
          keyExtractor={item=>item.id}
        />
        <View>
          <Button 
            title="New One"
            onPress={this.props.onCreationClick}
          />
          <Button
            title="Update data"
            onPress={this.updateDataFromDB}
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
  }
});

//make this component available to the app
export default Dashboard;
