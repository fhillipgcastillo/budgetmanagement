import AsyncStorage from "@react-native-async-storage/async-storage";
import { DBKEY, TYPEOFPAYMENTS } from "../constants";
import transactionApi from "./transactions.api";

//TODO: Add encription to DB with some unique key for the phone
export const getDB = async (key = DBKEY) => {
  //getting and formating data

  var dbPure = await AsyncStorage.getItem(key);
  let db = [];
  if (!dbPure) {
    await updateDB(key, []);
    dbPure = await AsyncStorage.getItem(key);
  }
  db = JSON.parse(dbPure);

  return db;
};
export const updateDB = async (key = DBKEY, newDBData) => {
  var dbPure = JSON.stringify(newDBData);
  //commiting changes
  await AsyncStorage.setItem(key, dbPure);
};
export const RESULT_TEMPLATE = {
  success: false,
  fail: false,
  failMessage: null,
  data: null,
};

export default API = {
  getAccounts: async () => {
    let success = false;
    let fail = false;
    let failMessage;
    let db = [];

    try {
      db = await getDB(DBKEY);
      success = true;
    } catch (error) {
      fail = true;
      failMessage = error;
      console.log("fail retrieving accounts", error);
    }

    return {
      success: success,
      fail: fail,
      failMessage: failMessage,
      data: db,
    };
  },
  createNewAccount: async (account) => {
    let success = false;
    let fail = false;
    let failMessage;

    try {
      let db = await getDB(DBKEY);
      account.id = db && db.length > 0 ? db.sort((x) => -x.id)[0].id + 1 : 1;
      //TODO: validate the same title doesn't exist
      db.push(account);
      await updateDB(DBKEY, db);
      success = true;
    } catch (error) {
      fail = false;
      failMessage = error;
    }

    return {
      success: success,
      fail: fail,
      failMessage: failMessage,
      data: account,
    };
  },
  removeAccountById: async (accountId) => {
    let db = null;
    let result = {
      success: false,
      fail: false,
      failMessage: null,
      data: null,
    };

    try {
      db = await getDB(DBKEY);
      if (db.find((a) => a.id === accountId)) {
        let filtered = db.filter((account) => account.id !== accountId);
        await updateDB(DBKEY, filtered);
        result.success = true;
      } else {
        result.fail = true;
        result.failMessage = "account id doesn't exist";
      }
    } catch (error) {
      result.fail = true;
      result.failMessage = error;
    }

    return result;
  },
  getAccountsByDateRange: async (initialDate, endingDate) => {
    let success = false;
    let fail = false;
    let failMessage;
    let data = [];

    try {
      let db = await getDB(DBKEY);
      data = db.filter((a) => {
        let date = new Date();
        if (a.dayOfMothToPay <= 0) {
          date = new Date(a.maxDateToPay);
        } else {
          date = new Date();
          date.setDate(a.dayOfMothToPay);
        }
        return (
          date >= initialDate && date <= endingDate
        ); /* || (a.type === TYPEOFPAYMENTS.QUATERLU && a.lastTimePayed < initialDate) */
      });
      success = true;
    } catch (error) {
      fail = false;
      failMessage = error;
    }
    return {
      success: success,
      fail: fail,
      failMessage: failMessage,
      data: data,
    };
  },
  updateAccount: async (account) => {
    let db = [];
    let result = Object.create(RESULT_TEMPLATE); 

    try {
      db = (await getDB(DBKEY)) || [];
      let accountIndex = db.findIndex((a) => a.id === account.id);
      if (!accountIndex < 0) throw "Account doesn't exist";
      db[accountIndex] = account;

      await updateDB(DBKEY, db);
      result.data = account;
    } catch (error) {
      result.fail = true;
      result.failMessage = error;
    }
    return result;
  },
  transaction: transactionApi,
};
