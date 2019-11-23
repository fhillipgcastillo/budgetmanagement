import { FETCHING_ACCOUNTS, CHANGE_CURRENT_VIEW, CHANGE_CURRENT_ACCOUNT_DETAIL } from './constants';

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
