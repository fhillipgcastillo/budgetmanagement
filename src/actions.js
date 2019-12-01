import {
  FETCHING_ACCOUNTS,
  CHANGE_CURRENT_VIEW,
  CHANGE_CURRENT_ACCOUNT_DETAIL,
  CREATE_NEW_ACCOUNT,
  UPDATE_ACCOUNTS,
  ACCOUNT_REMOVED
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
    API.getAccounts()
      .then(res => {
        return dispatch(updateAccounts(res.data));
      })
      .catch(console.error);
  };
}

export function changeCurrentView(data) {
  return {
    type: CHANGE_CURRENT_VIEW,
    payload: data
  };
}

export function changeAccountDetail(account) {
  return {
    type: CHANGE_CURRENT_ACCOUNT_DETAIL,
    payload: account
  };
}

export function createAccount(account) {
  return {
    type: CREATE_NEW_ACCOUNT,
    payload: account
  };
}
export function accountRemoved(accountId) {
  //show a alert
  return {
    type: ACCOUNT_REMOVED
  };
}

export function createNewAccount(account) {
  return dispatch =>
    API.createNewAccount(account)
      .then(res => {
        newAccount = dispatch(createAccount(res.data));
        dispatch(getAccounts());
        return newAccount;
      })
      .catch(console.error);
}

export function removeAccount(accountId) {
  return dispatch => {
    console.log("Remove account triggered");
    API.removeAccountById(accountId)
      .then(res => {
        dispatch(accountRemoved());
        dispatch(getAccounts());
        return res;
      })
      .catch(console.error);
  };
}
