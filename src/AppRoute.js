import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./screens/HomeScreen";
import { createAppContainer } from "react-navigation";
import App from "./components/App";
import Dashboard from "./components/dashboard";
import NewAccount from "./components/newItem";
import AccountDetail from "./components/acountDetail";


const MainNavigator = createStackNavigator(
  {
    Home: { screen: App },
    Dashboard: {
      screen: Dashboard,
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
    initialRouteName: "Dashboard"
  }
);

export default createAppContainer(MainNavigator);
