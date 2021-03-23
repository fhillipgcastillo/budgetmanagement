import {combineReducers} from 'redux';
import accountStates from './accountReducer';
import paymentsStates from './paymentsReducer';


export default rootReducer = combineReducers({
  /** reducers **/
  accountStates,
  paymentsStates
});