import { AsyncStorage } from 'react-native';
import { DBKEY, TYPEOFPAYMENTS } from '../constants';

//TODO: Add encription to DB with some unique key for the phone
const getDB = async  () => {
  //getting and formating data
  var dbPure = await AsyncStorage.getItem(DBKEY);
  let db = JSON.parse(dbPure);
  return db;
};
const updateDB = async (newDBData) => {
  dbPure = JSON.stringify(newDBData);
  //commiting changes
  await AsyncStorage.setItem(DBKEY, dbPure);
};

export default API = {
  getAccounts: async ()=> {
    let success = false;
    let fail = false;
    let failMessage;
    let db = [];
    
    try {
      db = await getDB();
      success = true;
    } catch (error) {
      fail = false;
      failMessage = error;
      console.log("fail retrieving accounts", error);
    }
    
    return {
      success: success,
      fail: fail,
      failMessage: failMessage,
      data: db
    };
  },
  createNewAccount : async (account) => {
    let success = false;
    let fail = false;
    let failMessage;

    try {
      let db = await getDB();
      account.id = db && db.length > 0 ? db.sort(x=>-x.id)[0].id + 1 : 1;
      //TODO: validate the same title doesn't exist
      db.push(account);
      await updateDB(db);
      success = true;
    } catch (error) {
      fail = false;
      failMessage = error;
    }
    
    return {
      success: success,
      fail: fail,
      failMessage: failMessage,
      data: account
    };
  },
  removeAccountById: async (accountId)=> {
    let db = null;
    let result = {
      success: false,
      fail: false,
      failMessage: null,
      data: null
    };

    try {
      db = await getDB();
      if(db.find(a=>a.id === accountId)){
        let filtered = db.filter(account => account.id !== accountId);
        await updateDB(filtered);
        result.success = true;
      } else {
        result.fail = true;
        result.failMessage ="account id doesn't exist";
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
      let db = await getDB();
      data = db.filter(a => {
        let date = new Date(a.maxDateToPay);
        return (date >= initialDate && date <= endingDate ) || a.paymentType === TYPEOFPAYMENTS.Monthly; /* || (a.type === TYPEOFPAYMENTS.QUATERLU && a.lastTimePayed < initialDate) */
      });
      success = true;
    } catch (error) {
      fail = false;
      failMessage = error;
      console.log("fail retrieving accounts", error);
    }
    
    return {
      success: success,
      fail: fail,
      failMessage: failMessage,
      data: data
    };
  }
};
