import { FETCHING_ACCOUNTS, CHANGE_CURRENT_VIEW, CHANGE_CURRENT_ACCOUNT_DETAIL, CREATE_NEW_ACCOUNT } from './constants';
import API from './api';

/**
 * Template
 * export function actionName(args) {
    return {
      type: CONSTANT,
      args
    }
  };
 */
export function getAccounts() {
  return {
    type: FETCHING_ACCOUNTS
  }
};

export function changeCurrentView(data){
  console.log('action - CHANGE_CURRENT_VIEW', data);
  return {
    type: CHANGE_CURRENT_VIEW,
    payload: data
  }
};

export function changeAccountDetail(account){
  return {
    type: CHANGE_CURRENT_ACCOUNT_DETAIL,
    payload: account
  };
};

export async function createNewAccount(account){
  return {
    type: CREATE_NEW_ACCOUNT,
    payload: await API.createNewAccount(account)
  };
};
