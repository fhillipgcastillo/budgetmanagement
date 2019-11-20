//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet , FlatList} from 'react-native';


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

const Item = ({title}) => {
  return (
    <View style={styles.item}>
      <Text>{title}</Text>
    </View>
  );
};

// create a component
class Dashboard extends Component {
  props
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Dashboard</Text>
        <FlatList 
          data={DATA}
          renderItem={({ item }) => <Item title={item.title} /> }
          keyExtractor={item=>item.id}
        />
      </View>
    );
  }
}



// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
    width: "100%",
  },
  item:{
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title:{
    fontSize: 32,
  }
});

//make this component available to the app
export default Dashboard;
