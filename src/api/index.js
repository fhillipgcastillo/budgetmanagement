import { AsyncStorage } from 'react-native';
import { DBKEY } from '../constants';

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
  getAccounts: async function(){
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
  createNewAccount : async function(account) {
    let success = false;
    let fail = false;
    let failMessage;

    try {
      db = await getDB();
      account.id = db ? db.length+1 : 1;
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
  }
};