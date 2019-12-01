import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import App from "./components/App";
import ManageAccounts from "./components/ManageAccounts";
import NewAccount from "./components/NewAccount";
import AccountDetail from "./components/AccountDetails"


const ManageAccountNavigator = createStackNavigator(
  {
    Home: { screen: App },
    ManageAccounts: {
      screen: ManageAccounts, 
      navigationOptions: {
        title: "Manage Accounts",
        headerStyle: {
          backgroundColor: "#2c3e50"
        },
        headerTintColor: "#fff"
      }
    },
    NewAccount: {
      screen: NewAccount,
      navigationOptions: {
        title: "Create new Account"
      }
    },
    AccountDetail:{
      screen: AccountDetail,
      navigationOptions:{
        title:"Details"
      }
    }
  },
  {
    initialRouteName: "ManageAccounts"
  }
);

const MainNavigation = createSwitchNavigator({
  ManageAccountsNav: ManageAccountNavigator
},
{
  initialRouteName: "ManageAccountsNav"
})
export default createAppContainer(MainNavigation);
