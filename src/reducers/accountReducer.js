import { combineReducers } from 'redux';
import { PAGES, ACOUNT_MODEL, CHANGE_CURRENT_VIEW, CHANGE_CURRENT_ACCOUNT_DETAIL, CREATE_NEW_ACCOUNT } from '../constants';

const INITIAL_STATE = {
  accounts: [],
  currentView: PAGES.dashboard,
  accountDetail: {},
  ACCOUTN_MODEL: ACOUNT_MODEL,
};

export default AccountReducer = (prevState = INITIAL_STATE, action)=>{
  console.log(`reducer - executing action ${action.type} with payload ${JSON.stringify(action.payload)}`);
  switch (action.type){
    case CHANGE_CURRENT_VIEW:
      return {
        ...prevState,
        currentView: action.payload
      }
    case CHANGE_CURRENT_ACCOUNT_DETAIL:
      return {
        ...prevState,
        accountDetail: action.payload
      };
    case CREATE_NEW_ACCOUNT:
      return {
        ...prevState,
        newAccount: action.payload
      }
    default:
      return prevState
  }
};
