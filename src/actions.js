import { FETCHING_ACCOUNTS } from './constants';

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
