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
  createNewAccount : async function(account) {
    let success = false;
    let fail = false;
    let failMessage;

    try {
      let db = await getDB();
      account.id = db.length+1;
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