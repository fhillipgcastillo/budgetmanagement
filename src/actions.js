import {
  FETCHING_ACCOUNTS,
  CHANGE_CURRENT_VIEW,
  CHANGE_CURRENT_ACCOUNT_DETAIL,
  CREATE_NEW_ACCOUNT,
  UPDATE_ACCOUNTS,
  ACCOUNT_REMOVED,
  UPDATE_ACCOUNTS_OF_THE_MONTH,
  ACCOUNTS_SYNC,
  UPDATE_CURRENT_WEEK,
  UPDATE_NEXT_WEEK
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
const getPayloadFromResponse = response =>
  response.fail ? response.error : response.data;

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
        let newAccount = dispatch(createAccount(res.data));
        dispatch(updateAccountsDependantes());
        return newAccount;
      })
      .catch(console.error);
}

export const removeAccount = accountId => {
  return dispatch => {
    API.removeAccountById(accountId)
      .then(res => {
        dispatch(accountRemoved());
        dispatch(updateAccountsDependantes());
        return res;
      })
      .catch(console.error);
  };
};
export const UpdateAcountsOfTheMonth = accounts => {
  return {
    type: UPDATE_ACCOUNTS_OF_THE_MONTH,
    payload: accounts
  };
};

export const accountsSync = () => {
  return {
    type: ACCOUNTS_SYNC
  };
};

export const updateAccountsDependantes = () => {
  var date = new Date();
  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  return dispatch => {
    dispatch(getAccounts());
    dispatch(getAccountsByDateRange(firstDay, lastDay));
    dispatch(accountsSync());
  };
};

export const getAccountsByDateRange = (initialDate, endingDate) => {
  return dispatch => {
    return API.getAccountsByDateRange(initialDate, endingDate).then(res =>
      dispatch(UpdateAcountsOfTheMonth(res.data))
    );
  };
};

export const UpdateThisWeek = account => ({
  type: UPDATE_CURRENT_WEEK,
  payload: account
});

export const UpdateNextWeek = account => ({
  type: UPDATE_NEXT_WEEK,
  payload: account
});

// current Date is 5
// this week is gonna be from 1 to 14
 const getFilteredThisWeekData = (currentDate, fullMonth) => {
  let isDayBwFirstBisweek = currentDate.getDate() >= 1 && currentDate.getDate() <= 14 ;

  let filtered = fullMonth.filter(ac => {
    let date;
    let thisWeekInicialDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      isDayBwFirstBisweek ? 1 : 15
    );
    let lastDay = new Date(
      currentDate.getFullYear(),
      isDayBwFirstBisweek
        ? currentDate.getMonth()
        : currentDate.getMonth() + 1,
        isDayBwFirstBisweek ? 14 : 0
    );

    if(ac.maxDateToPay && !ac.dayOfMothToPay){
      date = new Date(ac.maxDateToPay);
    } else {
      date = new Date();
      date.setDate(ac.dayOfMothToPay)
    }
    return date >= thisWeekInicialDate && date <= lastDay
  });

  return filtered;
};
const getFilteredNextWeekData = (currentDate, fullMonth) => {
  let isDayBwFirstBisweek = currentDate.getDate() >= 1 && currentDate.getDate() <= 14 ;
  let firstDay = new Date(
    currentDate.getFullYear(),
    isDayBwFirstBisweek ? currentDate.getMonth() :  currentDate.getMonth()+1,
    isDayBwFirstBisweek ? 15 : 1
  );
  let lastDay = new Date(
    currentDate.getFullYear(),
    isDayBwFirstBisweek
      ? currentDate.getMonth() + 1
      : currentDate.getMonth(),
    isDayBwFirstBisweek ? 0 : 14
  );
  let filtered = fullMonth.filter(ac => {
    let date;
    if(ac.maxDateToPay){
      date = new Date(ac.maxDateToPay);
    } else {
      date = new Date();
      date.setDate(ac.dayOfMothToPay)
    }
    
    return date >= firstDay && date <= lastDay;
  });
  return filtered;
};

export const syncMonthlyScheduleByCurrentDate = currentDate => {
  let firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  let lastDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );
  return dispatch => 
    API.getAccountsByDateRange(firstDay, lastDay)
    .then(res =>{
      let thisWeekData = getFilteredThisWeekData(currentDate, res.data);
      let nextWeekData = getFilteredNextWeekData(currentDate, res.data);
      dispatch(UpdateAcountsOfTheMonth(res.data));
      dispatch(UpdateThisWeek(thisWeekData));
      dispatch(UpdateNextWeek(nextWeekData));
    });
};

export function accountUpdated(payload) {
  //show a alert
  return {
    type: ACCOUNT_REMOVED,
    payload: payload || null
  };
}

export const updateAccount = account => {
  return dispatch =>
    API.updateAccount(account).then(res => {
      let payload = getPayloadFromResponse(res);
      dispatch(accountUpdated(payload));
      dispatch(updateAccountsDependantes());
      return res;
    });
};
