import { createStackNavigator } from "react-navigation-stack";
import DrawerMenu from "../components/DrawerMenu";
import AddTransaction from "../screens/Transactions/AddTransaction";
import TransactionsScreen from "../screens/TransactionsScreen";

const transactionsNavigation = createStackNavigator({
  Transactions: {
    screen: TransactionsScreen,
    navigationOptions: {
      title: "Transactions",
      headerLeft: DrawerMenu,
    },
  },
  AddTransaction: {
      screen: AddTransaction,
      navigationOptions: {
          title: "Add Transaction"
      }
  }
});

export default transactionsNavigation;
