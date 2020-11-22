import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator, DrawerActions } from 'react-navigation-drawer';
import { createAppContainer, createSwitchNavigator  } from "react-navigation";
import ManageAccountsScreen from "./components/ManageAccounts";
import NewAccount from "./components/NewAccount";
import AccountDetail from "./components/AccountDetails";
import NoLogedScreen from "./screens/NoLogedScreen";
import DashboardScreen from "./screens/DashboardScreen";
import transactionsNavigation from "./navigations/transactionsNavigation";
import DrawerMenu from "./components/DrawerMenu";

const accoutsNavitation = createStackNavigator({
  ManageAccounts: {
    screen: ManageAccountsScreen,
    navigationOptions: {
      title: "Manage Accounts",
      headerLeft: DrawerMenu,
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
  },
});

const mainNvigation = createStackNavigator(
  {
    BashBoard: {
      screen: DashboardScreen,
      navigationOptions: {
        title: "Dashboard",
        headerLeft: DrawerMenu,
      },
    }
  }
);

const drawerNavigation = createDrawerNavigator (
  {
    Dashboard: mainNvigation,
    Accounts: accoutsNavitation,
    Transactions: transactionsNavigation,
    noLogedInSplash:  {
      screen: NoLogedScreen,
      navigationOptions: {
        title: "Log out"
      }      
    }
  },{
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#fff"
      },
      headerTintColor: "#2c3e50"
    }
  }
);

const MainSwitchNavigation = createSwitchNavigator(
  {
    noLogedInSplash: NoLogedScreen,
    MainNavigation: drawerNavigation,
  },
  {
    initialRouteName: "MainNavigation"
  }
);

export default createAppContainer(MainSwitchNavigation);
