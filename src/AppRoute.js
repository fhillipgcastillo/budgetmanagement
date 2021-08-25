import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator, DrawerActions } from 'react-navigation-drawer';
import { createAppContainer, createSwitchNavigator  } from "react-navigation";
import ManageAccountsScreen from './screens/accounts/ManageAccounts';
import NewAccount from "./components/NewAccount";
import AccountDetail from "./screens/AccountDetailsScreen";
import NoLogedScreen from "./screens/NoLogedScreen";
import DashboardScreen from "./screens/DashboardScreen";
import React from 'react';
import { Button, Icon } from "native-base";
import PaymentsScreen from "./screens/PaymentsScreen";
import AddPaymentsScreen from "./screens/AddPaymentsScreen";
import ShowPaymentInfo from "./screens/PaymentInfoScreen";

const DrawerMenu = ({scene}) => (
  <Button transparent onPress={()=> (scene.descriptor.navigation.openDrawer())} style={{top: 20}}>
    <Icon name="menu" style={{color: "#000", width: 50, height: 50 }} />
  </Button>
);

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

const paymentNavigations = createStackNavigator({
 Payments: { 
   screen: PaymentsScreen,
    navigationOptions: {
      title: "Payments",
      headerLeft: DrawerMenu,
    }
  },
  AddPayments: { 
    screen: AddPaymentsScreen,
     navigationOptions: {
       title: "Payments",
      //  headerLeft: DrawerMenu,
     }
   },
   ShowPaymentInfo: {
     screen: ShowPaymentInfo,
     navigationOptions: {
       title: "Payment details"
     }
   }
});

const drawerNavigation = createDrawerNavigator (
  {
    Dashboard: mainNvigation,
    Accounts: accoutsNavitation,
    Payments: paymentNavigations
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
    initialRouteName: "noLogedInSplash"
  }
);

export default createAppContainer(MainSwitchNavigation);
