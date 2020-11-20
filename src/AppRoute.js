import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator, DrawerActions } from 'react-navigation-drawer';
import { createAppContainer, createSwitchNavigator  } from "react-navigation";
import ManageAccountsScreen from "./components/ManageAccounts";
import NewAccount from "./components/NewAccount";
import AccountDetail from "./components/AccountDetails";
import NoLogedScreen from "./screens/NoLogedScreen";
import DashboardScreen from "./screens/DashboardScreen";
import React from 'react';
import { Button, Icon } from "native-base";

const accoutsNavitation = createStackNavigator({
  ManageAccounts: {
    screen: ManageAccountsScreen,
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
});

const mainNvigation = createStackNavigator(
  {
    BashBoard: {
      screen: DashboardScreen,
      navigationOptions: {
        title: "Dashboard",
        headerStyle: {
          backgroundColor: "#fff"
        },
        headerTintColor: "#2c3e50",
        headerLeft: () => (
          <Button transparent onPress={()=> (alert(" hello") && DrawerActions.openDrawer())} >
            <Icon name="menu" style={{color: "#000"}} />
          </Button>
        ),
      },
    }
  }
);

const drawerNavigation = createDrawerNavigator (
  {
    Dashboard: mainNvigation,
    Accounts: accoutsNavitation
  },
);

const MainSwitchNavigation = createSwitchNavigator(
  {
    noLogedInSplash: NoLogedScreen,
    MainNavigation: drawerNavigation,
  },
  {
    initialRouteName: "noLogedInSplash"
  }
);

export default createAppContainer(MainSwitchNavigation);
