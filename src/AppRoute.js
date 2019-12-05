import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import ManageAccounts from "./components/ManageAccounts";
import NewAccount from "./components/NewAccount";
import AccountDetail from "./components/AccountDetails";
import NoLogedScreen from "./screens/NoLogedScreen";
import DashboardScreen from "./screens/DashboardScreen";

const MainNavigation = createStackNavigator(
  {
    BashBoard: {
      screen: DashboardScreen
    },
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
    },
    AccountDetail: {
      screen: AccountDetail,
      navigationOptions: {
        title: "Details"
      }
    }
  },
  { initialRouteName: "BashBoard" }
);

const MainSwitchNavigation = createSwitchNavigator(
  {
    noLogedInSplash: NoLogedScreen,
    MainNavigation: MainNavigation,
  },
  {
    initialRouteName: "MainNavigation"
  }
);
export default createAppContainer(MainSwitchNavigation);
