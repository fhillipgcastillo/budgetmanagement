//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  ScrollView,
  TouchableHighlight
} from "react-native";
import { connect } from "react-redux";
import AccountPreviewItem from "../components/AccountPreviewItem";
import {
  getAccountsByDateRange,
  syncMonthlyScheduleByCurrentDate
} from "../actions";
import { SubTitle } from "../components/Title";

import AccountListCard from "../components/AccountListCard";

// create a component
class DashboardScreen extends Component {
  componentDidMount() {
    this.getAccountsForThisMonth();
  }
  getAccountsForThisMonth = () => {
    let date = new Date();
    // let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    // let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.props.actions.syncMonthlyScheduleByCurrentDate(date);
  };
  getWeekTotalSpends = accounts => {
    let total = 0.0;
    accounts.forEach(a => (total += a.amount));
    return total;
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{  display: "flex", flex:1, width:"100%", paddingVertical: 10, marginBottom: 10 }}>
          <Text style={{ ...styles.subtitle, ...styles.centerText }}>
            Current week $
            {this.getWeekTotalSpends(this.props.states.currentWeek)}
          </Text>

          <AccountListCard 
            data={this.props.states.currentWeek}
            type="current"
            navigation={this.props.navigation}
          />

          <Text style={{ ...styles.subtitle, ...styles.centerText }}>
            Next week ${this.getWeekTotalSpends(this.props.states.nextWeek)}
          </Text>

          <AccountListCard 
            data={this.props.states.nextWeek}
            type="next"
            navigation={this.props.navigation}
          />

          <Text style={{ ...styles.subtitle, ...styles.centerText }}>
            All of the month $
            {this.getWeekTotalSpends(this.props.states.accountsOfTheMonth)}
          </Text>

          <AccountListCard 
            data={this.props.states.accountsOfTheMonth}
            type="All month"
            navigation={this.props.navigation}
          />
        </ScrollView>

        <Button
          title="Go to Accouts"
          onPress={() => this.props.navigation.navigate("ManageAccounts")}
          style={styles.button}
        />
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#2c3e50",
    paddingVertical: 10,
    width: "100%"
  },
  subtitle: {
    fontSize: 22,
    color: "#fff",
    marginTop: 15
  },
  centerText: {
    textAlign: "center"
  },
  button: {
    margin: 5,
    borderRadius: 20,
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
