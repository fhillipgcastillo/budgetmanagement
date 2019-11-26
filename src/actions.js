import {
  FETCHING_ACCOUNTS,
  CHANGE_CURRENT_VIEW,
  CHANGE_CURRENT_ACCOUNT_DETAIL,
  CREATE_NEW_ACCOUNT,
  UPDATE_ACCOUNTS
} from "./constants";
import API from "./api";

/**
 * Template
 * export function actionName(args) {
    return {
      type: CONSTANT,
      args
    }
  };
 */

export function updateAccounts(accounts) {
  return {
    type: UPDATE_ACCOUNTS,
    payload: accounts
  };
}

export function getAccounts() {
  return dispatch => {
    API
    .getAccounts()
    .then(res => {
      return dispatch(updateAccounts(res.data));
    })
    .catch(console.error);
  };
};

export function changeCurrentView(data) {
  return {
    type: CHANGE_CURRENT_VIEW,
    payload: data
  };
};

export function changeAccountDetail(account) {
  return {
    type: CHANGE_CURRENT_ACCOUNT_DETAIL,
    payload: account
  };
};

export function createAccount(account){
  return {
    type: CREATE_NEW_ACCOUNT,
    payload: account
  };
};

export function createNewAccount(account) {
  return dispatch => 
    API
      .createNewAccount(account)
      .then(res => {
        return dispatch(createAccount(res.data));
      })
      .catch(console.error);
};
