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
import {
  getAccountsByDateRange,
  syncMonthlyScheduleByCurrentDate
} from "../actions";
import { SubTitle } from "../components/Title";

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
  }
  getAccountsForThisMonth = () => {
    let date = new Date();
    // let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    // let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.props.actions.syncMonthlyScheduleByCurrentDate(date);
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{ flex: 6, display: "flex" }}>
          <Text style={styles.subtitle}>Current week</Text>
          <ScrollView style={{ flex: 4 }}>
            <FlatList
              data={this.props.states.currentWeek}
              renderItem={({ item }) => (
                <AccountPreviewItem
                  key={item.id}
                  account={item}
                  type="current"
                  navigation={this.props.navigation}
                />
              )}
              keyExtractor={item => item.id.toString()}
            />
          </ScrollView>
          <Text style={styles.subtitle}>Next week</Text>
          <ScrollView style={{ flex: 4 }}>
            <FlatList
              data={this.props.states.nextWeek}
              renderItem={({ item }) => (
                <AccountPreviewItem
                  key={item.id}
                  type="next"
                  account={item}
                  navigation={this.props.navigation}
                />
              )}
              keyExtractor={item => item.id.toString()}
            />
          </ScrollView>
          <Text style={styles.subtitle}>All of the month</Text>
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
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#2c3e50"
  },
  subtitle: {
    fontSize: 16,
    color: "#fff"
  }
});

const mapStateToProps = state => {
  return {
    states: {
      accountsOfTheMonth: state.accountStates.accountsOfTheMonth,
      currentWeek: state.accountStates.currentWeek,
      nextWeek: state.accountStates.nextWeek
    }
  };
};
const mapDispatchToProps = dispatch => {
  return {
    actions: {
      getAccountsByDateRange: (initial, ending) =>
        dispatch(getAccountsByDateRange(initial, ending)),
      syncMonthlyScheduleByCurrentDate: currentDate =>
        dispatch(syncMonthlyScheduleByCurrentDate(currentDate))
    }
  };
};
//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);
