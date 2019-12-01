//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  ScrollView
} from "react-native";
import { connect } from "react-redux";
import AccountPreviewItem from "../components/AccountPreviewItem";
import { getAccountsByDateRange } from "../actions";

// create a component
class DashboardScreen extends Component {
  static navigationOptions = {
    title: "Central control",
    headerStyle: {
      backgroundColor: "#2c3e50"
    },
    headerTintColor: "#fff"
  };
  componentDidMount() {
    this.getAccountsForThisMonth();
  };
  getAccountsForThisMonth = () => {
    let date = new Date();
    let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.props.actions.getAccountsByDateRange(firstDay, lastDay);
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>Dashboard Screen</Text>
        <ScrollView style={{ flex: 4 }}>
          <FlatList
            data={this.props.states.accountsOfTheMonth}
            renderItem={({ item }) => (
              <AccountPreviewItem
                key={item.id}
                account={item}
                navigation={this.props.navigation}
              />
            )}
            keyExtractor={item => item.id.toString()}
          />
        </ScrollView>
        
        <Button
          title="Go to Accouts"
          onPress={() => this.props.navigation.navigate("ManageAccounts")}
        />
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50"
  }
});

const mapStateToProps = state => {
  return {
    states: {
      accountsOfTheMonth: state.accountStates.accountsOfTheMonth
    }
  };
};
const mapDispatchToProps = dispatch => {
  return {
    actions: {
      getAccountsByDateRange: (initial, ending) =>
        dispatch(getAccountsByDateRange(initial, ending))
    }
  };
};
//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);
