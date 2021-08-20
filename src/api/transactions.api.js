import { getDB, updateDB } from ".";
import { DB_PAYMENTS } from "../constants";


export default {
  async create(transaction){
    let success = false;
    let fail = false;
    let failMessage;

    try {
      let db = await getDB(DB_PAYMENTS);
      //generate id
      transaction.id = db && db.length > 0 ? (db.sort(x => -x.id)[0].id + 1) : 1;
      db.push(transaction);
      await updateDB(DB_PAYMENTS, db);
      success = true;
    } catch (error) {
      fail = false;
      failMessage = error;
    }

    return {
      success: success,
      fail: fail,
      failMessage: failMessage,
      data: transaction
    };
  },
  async all(){
    let success = false;
    let fail = false;
    let failMessage;
    let db = [];
 
    try {
      db = await getDB(DB_PAYMENTS);
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
  get(){},
};
