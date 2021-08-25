//import liraries
import React, { Component } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  ScrollView,
  RefreshControl,
} from "react-native";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  changeAccountDetail,
  changeCurrentView,
  changeRefreshing,
  syncAccounts,
} from "../../actions";
import { PAGES, ACOUNT_MODEL } from "../../constants";
import Title from "../../components/Title";
import AccountPreviewItem from "../../components/AccountPreviewItem";
import AccountListCard from "../../components/AccountListCard";

const budgetKey = "budget_acount";

// create a component
class ManageAccounts extends Component {
  state = { refleshing: false };
  componentWillMount() {
    this.updateDataFromDB();
  }
  componentDidMount() {}
  resetDbData = async () => {
    //use existent functionality for this -- the API
    await AsyncStorage.setItem(budgetKey, JSON.stringify(ACOUNT_MODEL));
  };
  fullDataReset = async () => {
    await AsyncStorage.setItem(budgetKey, JSON.stringify([]));
    this.updateDataFromDB();
  };
  updateRefreshing = async (refleshing) => {
    this.props.actions.changeRefreshing({ refleshing });
  };
  updateDataFromDB = async () => {
    this.updateRefreshing.bind(true);
    this.props.actions
      .syncAccounts()
      .then(() => this.updateRefreshing.bind(this, false))
      .catch(() => this.updateRefreshing.bind(this, false));
  };
  handleCreateNewPress = () => {
    this.props.navigation.navigate("NewAccount");
  };
  render() {
    return (
      <View style={styles.container}>
        {/* <Title text="Active Accounts" style={{ flex: 1 }} /> */}
        <ScrollView
          style={{ flex: 4, width: "100%" }}
          refreshControl={
            <RefreshControl
              refreshing={this.props.states.global.refreshing}
              onRefresh={this.updateDataFromDB.bind(this)}
            />
          }
        >
          <AccountListCard
            data={this.props.states.accounts}
            navigation={this.props.navigation}
          />
        </ScrollView>
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
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50",
    width: "100%",
    height: "100%",
  },
  item: {
    backgroundColor: "#4691df",
    padding: 20,
    margin: 15,
  },
  title: {
    fontSize: 32,
    color: "#fff",
  },
  actionContainer: {
    flex: 1,
    justifyContent: "space-around",
    flexDirection: "row",
    maxHeight: 30,
    margin: 10,
    marginBottom: 10,
    marginTop: 15,
  },
  actionBtn: {
    height: 20,
    margin: 5,
  },
});

function mapStateToProps(state) {
  return {
    states: {
      global: state.global,
      accounts: state.accountStates.accounts,
      currentView: state.accountStates.currentView,
      accountDetail: state.accountStates.accountDetail,
      DUMMY_DATA: state.accountStates.ACOUNT_MODEL,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      goTo: (page) => dispatch(changeCurrentView(page)),
      changeAccountDetail: (account) => dispatch(changeAccountDetail(account)),
      syncAccounts: () => dispatch(syncAccounts(dispatch)),
      changeRefreshing: (refreshing) => dispatch(changeRefreshing(refreshing)),
    },
    goTo: (page) => dispatch(changeCurrentView(page)),
  };
}

//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(ManageAccounts);
