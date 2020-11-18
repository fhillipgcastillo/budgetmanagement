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
      screen: DashboardScreen,
      navigationOptions: {
        title: "Weekly Payments Control",
        headerStyle: {
          backgroundColor: "#fff"
        },
        headerTintColor: "#2c3e50"
      },
    },
    ManageAccounts: {
      screen: ManageAccounts,
      navigationOptions: {
        title: "Manage Accounts",
        headerStyle: {
          backgroundColor: "#fff"
        },
        headerTintColor: "#2c3e50"
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
