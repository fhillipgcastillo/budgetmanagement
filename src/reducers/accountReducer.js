import {
  PAGES,
  ACOUNT_MODEL,
  CHANGE_CURRENT_VIEW,
  CHANGE_CURRENT_ACCOUNT_DETAIL,
  CREATE_NEW_ACCOUNT,
  GET_ALL_ACCOUNTS,
  UPDATE_ACCOUNTS,
  ACCOUNT_REMOVED,
  UPDATE_ACCOUNTS_OF_THE_MONTH,
  UPDATE_CURRENT_WEEK,
  UPDATE_NEXT_WEEK,
} from "../constants";

const INITIAL_STATE = {
  accounts: [],
  currentView: PAGES.dashboard,
  accountDetail: {},
  ACCOUTN_MODEL: ACOUNT_MODEL,
  accountsOfTheMonth: [],
  currentWeek: [],
  nextWeek: [],
};

export default AccountReducer = (prevState = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_CURRENT_VIEW:
      return {
        ...prevState,
        currentView: action.payload
      };
    case CHANGE_CURRENT_ACCOUNT_DETAIL:
      return {
        ...prevState,
        accountDetail: action.payload
      };
    case CREATE_NEW_ACCOUNT:
      return {
        ...prevState,
        newAccount: action.payload
      };
    case UPDATE_ACCOUNTS:
      return {
        ...prevState,
        accounts: action.payload
      };
    case GET_ALL_ACCOUNTS:
      return {
        ...prevState,
        accounts: action.payload
      };
    case UPDATE_ACCOUNTS_OF_THE_MONTH:
      return {
        ...prevState,
        accountsOfTheMonth: action.payload
      }
    case UPDATE_CURRENT_WEEK:
      return {
        ...prevState,
        currentWeek: action.payload
      }
    case UPDATE_NEXT_WEEK:
        return {
          ...prevState,
          nextWeek: action.payload
        }
    case ACCOUNT_REMOVED:
    default:
      return prevState;
  }
};
