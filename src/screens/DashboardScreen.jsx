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
  getWeekTotalSpends = accounts => {
    let total = 0.0;
    accounts.forEach(a => (total += a.amount));
    return total;
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{ flex: 6, display: "flex", paddingVertical: 10, marginBottom: 10 }}>
          <Text style={{ ...styles.subtitle, ...styles.centerText }}>
            Current week $
            {this.getWeekTotalSpends(this.props.states.currentWeek)}
          </Text>

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

          <Text style={{ ...styles.subtitle, ...styles.centerText }}>
            Next week ${this.getWeekTotalSpends(this.props.states.nextWeek)}
          </Text>

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
          <Text style={{ ...styles.subtitle, ...styles.centerText }}>
            All of the month $
            {this.getWeekTotalSpends(this.props.states.accountsOfTheMonth)}
          </Text>

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
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#2c3e50",
    paddingVertical: 10
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
